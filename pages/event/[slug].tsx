import Head from 'next/head'
import Layout from '../../components/layout/Layout'

import { gql } from "@apollo/client";
import {client} from "../../apollo/apollo-client";

function Master({ post }) {
  console.log(post)
  return (
    <Layout >
 
      here
    </Layout>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { data } = await client.query({
      query: gql`
        query Sportstats {
          masterEvents {
            masterEvents{
              id :mid
              info{
                name
                latestEventId
                date
              }
            }
          }
        }
      `,
    });

  // Get the paths we want to pre-render based on posts
  const paths = data.masterEvents.masterEvents.map((master) => ({

    params: { 
      slug: master.id.toString(), 
      mid: master.id 
    }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `slug`.
  // If the route is like /posts/1, then params.slug is 1
 console.log(params)

  const query = gql`
    query Sportstats($mid: String!) {
      masterEvent(mid: $mid) {
            mid
            sid
            info{
              name
              description
              imageUrl
              country
            }
            events {
              id : eid
              eid
              date
              name
              city
            }
            series {
              sid
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
    }
  `;

  const { data } = await client.query({
      query: query,
      variables: {
        mid: params.mid.toString()
      }
    });

  // Pass post data to the page via props
  return { props: { post: data } }
}

export default Master