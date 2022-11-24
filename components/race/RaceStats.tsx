import React, {useState, useEffect, PureComponent} from "react"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

import { Flex, Box, Image, Button, Text, Heading, CloseButton } from '@chakra-ui/react';

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'

import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer, Surface, Symbols, Tooltip } from 'recharts';


var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

let renderLabel = function(entry) {
    return entry.name;
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, name } = props;

  if( (percent * 100).toFixed(0) < 3) {
    return null
  }
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${name}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

let renderOuterData = function(entry) {
    var send = []
    for (const [key, value] of Object.entries(entry)) {
      send.push({name:key, value:value})
    }
    return send;
}



let percentage = function(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
} 

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{backgroundColor:'grey', padding:'2em', borderRadius:'5px'}}>
        <p className="label">{`Category : ${payload[0].name}`}</p>
        <p className="label">{`Total #  : ${payload[0].value}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

function HeroCard({ race, setOpenStats }) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const [filter, setFilter] = useState([])

  const sumGender = race?.category.genders.reduce((accumulator, object) => { return accumulator + object.GC }, 0);

  const countedNames = race?.category.cats.filter((cat)=> cat.CL.charAt(0) != filter  ).reduce((allNames, name) => {
    var currCount = allNames[filter.length>0?name.CL:name.CL.slice(1)] ?? 0; 
    if( percentage(name.CC, sumGender).toFixed(0)  < 3 ){
       currCount = allNames["other"] ?? 0;

      return {
        ...allNames,
        ["other"]: currCount + name.CC,
      }
    } else {
      return {
        ...allNames,
        [filter.length>0?name.CL:name.CL.slice(1)]: currCount + name.CC,
      }
    };
  }, {});

  const handleClickFilter = dataKey => {
    if (filter?.includes(dataKey)) {
      setFilter(
        filter.filter(obj => obj !== dataKey)
      );
    } else {
      setFilter([...filter, dataKey]);
    }
  };

  const renderCusomizedLegend = ({ payload }) => {
    return (
      <div className="customized-legend">
        {payload.map(entry => {
          const { id, color, value } = entry;
          const active = filter?.includes(id);
          const style = {
            marginRight: 10,
            color: active ? "#AAA" : "#000",
            display:'block'
          };

          return (
            <span
              className="legend-item"
              onClick={()=>{handleClickFilter(id)}}
              style={style}
            >
              <Surface width={10} height={10} viewBox="0 0 20 10" style={{display:'inline', marginRight:'1em'}} >
                <Symbols cx={5} cy={5} type="circle" size={60} fill={color} />
                {active && (
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={50}
                    fill={"#FFF"}
                  />
                )}
              </Surface>
              <span>{value}</span>
            </span>
          );
        })}
      </div>
    );
  };


  return (
    <>
      <Flex className='card__base' flexWrap='wrap' position='relative' w='100%' pb='2'>
        <CloseButton 
            style={{border:'1px solid black', position:'absolute', right:'5px', top:'5px'}} 
            onClick={()=>setOpenStats(false)}
          />
        <Heading w='100%' px='2' sx={{borderBottom:'1px solid black'}}>Statistics </Heading>
        <Flex flexWrap='wrap' gap='3' p={'2'} justifyContent='space-evenly' mt='2'> 
          <Box sx={{border:'1px solid black', borderRadius:'15px'}} w={['100%','100%','100%','45%']}   p={['0','2']} >
              <Heading sx={{borderBottom:'1px solid black'}}> Athletes / Registered </Heading>
              <ResponsiveContainer width="99%" height="90%">
                <PieChart width={'99%'} height="90%" >
                  <Legend
                    layout="vertical" verticalAlign="top" align="right"
                    content={renderCusomizedLegend}
                    payload={
                      race?.category.genders.map((gender)=> { return {name:gender.GL, value:gender.GC}}).map(
                        (item, index) => ({
                          id: item.name,
                          type: "square",
                          value: `${t('public:signup.gender-data.'+item.name.toLowerCase())} - ${item.value} (${ Math.round( percentage( item.value, sumGender ) * 100) /100  }%)`,
                          color: COLORS[index % COLORS.length]
                        })
                      )
                    }
                  />
                  <Pie 
                    data={race?.category.genders.map((gender, idx)=> { return {name:gender.GL, value:gender.GC, fill: COLORS[idx % COLORS.length] }}).filter((gen)=> !filter.includes(gen.name))} 
                    dataKey="value" cx="60%" cy="55%" outerRadius={60}
                  >
                    {race?.category.genders.map((gender, idx)=> { return {name:gender.GL, value:gender.GC, fill: COLORS[idx % COLORS.length] }}).filter((gen)=> !filter.includes(gen.name)).map((entry, index) => (
                      <Cell key={`cell-${index}-${entry.id}`} fill={entry.fill} />
                    ))}
                  </Pie>

                  <Pie 
                    data={renderOuterData(countedNames)} 
                    label={renderActiveShape}
                    dataKey="value" cx="60%" cy="55%" 
                    innerRadius={70} outerRadius={100} fill="#82ca9d"  
                  >
                    {renderOuterData(countedNames).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
          </Box>

          <Box sx={{border:'1px solid black', borderRadius:'15px'}} w={['100%','100%','100%','45%']}   p={['0','2']} >
              <Heading sx={{borderBottom:'1px solid black'}}>   Athletes / Finish </Heading>
              <ResponsiveContainer width="99%" height="90%">
                <PieChart width={'99%'} height="90%" >
                  <Legend
                    layout="vertical" verticalAlign="top" align="right"
                    content={({payload})=>{
                      var sum = payload.reduce((accumulator, object) => { return accumulator + object.value }, 0);
                      return payload.map((entry, index) => (
                        <span key={`item-${index}`} className="legend-item" style={{display:'block'}}> 
                          <Surface width={10} height={10} viewBox="0 0 20 10" style={{display:'inline', marginRight:'1em'}} >
                            <Symbols cx={5} cy={5} type="circle" size={60} fill={entry.fill} />
                            
                              
                          </Surface>
                          {entry.name} : {entry.value} ( {Math.round( percentage( entry.value, sum ) * 100) /100 }% ) 
                        </span>
                      ))
                    }}
                    payload={[
                        {name:'Finished', value: race.stats.FIN, fill: COLORS[1 % COLORS.length]},
                        {name:'DNS', value: race.stats.DNS, fill: COLORS[2 % COLORS.length]},
                        {name:'DNF', value: race.stats.DNF, fill: COLORS[3 % COLORS.length]},
                        {name:'DSQ', value: race.stats.DSQ, fill: COLORS[4 % COLORS.length]},
                      ]
                    }

                  />
                  <Pie 
                    data={[
                      {name:'Finished', value: race.stats.FIN, fill: COLORS[1 % COLORS.length]},
                      {name:'DNS', value: race.stats.DNS, fill: COLORS[2 % COLORS.length]},
                      {name:'DNF', value: race.stats.DNF, fill: COLORS[3 % COLORS.length]},
                      {name:'DSQ', value: race.stats.DSQ, fill: COLORS[4 % COLORS.length]},
                    ]} 
                    dataKey="value" cx="60%" cy="55%" outerRadius={120}
                     isAnimationActive={false} 
                  />
                    
                </PieChart>
              </ResponsiveContainer>
          </Box>
        </Flex>

        <Flex flexWrap='wrap' w='100%' p='2'>
          <Heading sx={{borderBottom:'1px solid black'}} p='2'>Split overview</Heading>
          <UnorderedList w='100%'>
            <ListItem>Number at Start - </ListItem>
          </UnorderedList>
        </Flex>

      </Flex>
    </>
  )
}


export default  HeroCard 
