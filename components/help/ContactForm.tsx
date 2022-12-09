import React from 'react';
import { useForm } from 'react-hook-form';

import { Input, Button, Flex, Box, Textarea, Text, Select } from '@chakra-ui/react';

const ContactForm = ({info}) => {
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm();
  const [sent, setSent] = React.useState(false)

  const onSubmit = async (formData) => {
    try {
      setSent(true)

      var meta = [{name: formData.category}] ;
      var tags = [{name: formData.category}] ;
      var subject = ''

      if(info){
        // @ts-ignore
        meta = [...meta, 
          // @ts-ignore
          {eid: info.eid},
          // @ts-ignore
          {rid: info.rid},
          // @ts-ignore
          {bib: info.bib}
        ]

        tags =[
          ...tags,
          {name: `${info.event}`},
          {name: `${info.event} - ${info.race}`}
        ]

        subject += `${info.event} | ${info.race} | BIB:${info.bib} - `
      }

      subject += formData.subject

      const response = await fetch('https://2tdxe2ivhf.execute-api.us-west-2.amazonaws.com/dev/gorgias/tickets', {
        method: 'POST',
        headers: {
          accept: 'application/json', 'content-type': 'application/json',
          authorization: 'Basic cmNyYXdmb3JkQHNwb3J0c3RhdHMub25lOjQwNDBhYTUxYmRjMTY5YWJkNDU4Y2IwZTkxZjA3ZDgyNmQ5MDg5NDczMTZkNjAwM2I5ZTA5ZWJkOGQ1ODBkOTQ='
        },
        body: JSON.stringify({
          customer:{
            email:formData.email
          },
          messages:[{
            channel:'api',
            from_agent: false,
            sender:{
              email:formData.email
            },
            source: {
              to: [{address: 'corrections@sportstats.one'}],
              from: {address: formData.email, name: formData.name}
            },
            body_text: formData.message,
            subject: subject,
            via: 'api'

          }],
          meta: meta,
          via: 'email',
          tags: tags,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(()=>{
    if(info) {
      setValue('category', info.category)
      setValue('event', info.event)
      setValue('race', info.race)
    } else {
      setValue('category', 'corrections')
    }
  },[info])

  if(sent) {
    return (
      <Text pb='5'>
        Support ticket has been made. We will be in contact with you
      </Text>
    )
  }

  return (
    <Flex as='form' pb='3' flexWrap='wrap' gap='5' onSubmit={handleSubmit(onSubmit)}>
      {info&&
        <>
          <Text> {info.event} - {info.race} </Text>
        </>
      }
      <Input
        name="name"
        placeholder="Your name"
        {...register('name',{ required: true })}
      />
      {errors.name && <p>This field is required</p>}

      <Box
        w='100%'
        flexWrap='wrap'
      >
        <Input
          name="email"
          placeholder="Your email"
          {...register('email',{ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This field is required</p>}
      </Box>

      {!info &&
        <Box
          w={['100%', '50%', '33%']}
          flexWrap='wrap'
        >
          <Select
            w='100%'
            name="category"
            {...register('category',{ required: true })}
            defaultValue='corrections'
          >
            <option value='corrections'>Timing / Result Correction</option>
            <option value='general'>General Inquiry</option>
            <option value='business'>Business Opportunities</option>
          </Select>
          {errors.category && <p>This field is required</p>}
        </Box>
      }

      <Box
         w={!info?['100%', '48%', '64%']:'100%'}
         flexWrap='wrap'
      >

        <Input
          w='100%'
          name="subject"
          placeholder="Subject"
          {...register('subject',{ required: true })}
         
        />
        {errors.subject && <p>This field is required</p>}
      </Box>

      {watch('category') === 'corrections' && (
        <>
          {!info &&
            <>
              <Select
                name="event"
                placeholder='Event Name'
                {...register('event',{ required: true })}
                w={['100%', '50%', '33%']}
              >
              </Select>
              {errors.event && <p>This field is required</p>}

               <Select
                name="race"
                placeholder='Race Name'
                {...register('race',{ required: true })}
                w={['100%', '50%', '33%']}
              >
              </Select>
              {errors.race && <p>This field is required</p>}
            </>
          }
          
          <Input
            name="bib"
            placeholder="Bib"
            {...register('bib',{ required: true })}
            w={['100%', '50%', '23%']}
          />
          {errors.subject && <p>This field is required</p>}
        </>
      )}
      {watch('category') === 'business' && (
        <>
          <Select
            name="region"
            {...register('region',{ required: true })}
            w={'100%'} placeholder='Region'
          >
            <option value='east'>Canada-East</option>
            <option value='west'>Canada-West</option>
            <option value='usa'>USA</option>
            <option value='asia'>Asia</option>
            <option value='la'>Latin America</option>
            <option value='india'>India</option>
          </Select>
          {errors.category && <p>This field is required</p>}
        </>
      )}

      <Box
        w='100%'
        flexWrap='wrap'
      >
        <Textarea
          name="message"
          placeholder="Your message"
          {...register('message',{ required: true })}
          w='100%'
        />
        {errors.message && <p>This field is required</p>}
      </Box>

      <Button type="submit" colorScheme='green'>Submit</Button>
    </Flex>
  );
};

export default ContactForm;