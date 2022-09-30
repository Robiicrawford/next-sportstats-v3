import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Layout from '../../components/layout/Layout'

import { gql } from "@apollo/client";
import {client} from "../../apollo/apollo-client";

import axios from 'axios'
import {slugSet } from "../../utils/setSlug"


function Master({ series }) {
  console.log(series)
  return (
    <Layout header_color='black' >
 
      here
    </Layout>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get all series

    const res = await fetch('http://admin.sportstats.ca/event_master/adminapi.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "cmd": "getSeries",
        "opt": "list", 
        'idToken': 'apS3gn4%nv^gjBEQF12!!b15'
      }) 
    });

  const series_list = await res.json()
  // Get the paths we want to pre-render based on series_list
  const paths = series_list.data.series.map((series) => ({
    
    params: { 
      slug: slugSet(series.sl)
    }
  }))

  console.log(paths)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { 
    paths, 
    fallback: true 
  }
}

// This also gets called at build time
export async function getStaticProps({ params, locale }) {
  // params contains the series `slug`.
  // If the route is like /series/1, then params.slug is 1

  const query = gql`
    query Sportstats($slug: String!) {
      series(slug: $slug) {
        id
        sid
        slug
        info {
          name
          logo
          description
        }
        links {
          id: lid
          lt
          lo
          ll
          lu
        }
        masterEvents {
          id
          mid
          info {
            name
            date
            imageUrl
            country
          }
          events {
            country
            city
          }
        }
      }
    }
  `;

  const { data } = await client.query({
      query: query,
      variables: {
        slug: params.slug
      }
    });

  // Pass post data to the page via props
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      series: data 
    } 
  }
}

export default Master