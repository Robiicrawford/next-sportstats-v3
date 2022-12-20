// pages/sitemap.xml.js

// this page generates our sitemap

const EXTERNAL_DATA_URL_EVENT = 'https://sportstats.today/event';
const EXTERNAL_DATA_URL_SERIES = 'https://sportstats.today/series';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
     <!--We manually set the URLs we know already-->
     <url>
       <loc>https://sportstats.today</loc>
     </url>
     <url>
       <loc>https://sportstats.today/about</loc>
     </url>
     <url>
       <loc>https://sportstats.today/help</loc>
     </url>
     <url>
       <loc>https://sportstats.today/help/contact</loc>
     </url>

     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL_EVENT}/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  //const request = await fetch('https://admin.sportstats.ca');
  //const posts = await request.json();
	const posts = [{slug:'1'}]
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;