module.exports = {
   i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'en-CA', 'fr', 'th'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
    localeDetection: true,
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    domains: [
    {
        domain: 'sportstats.today',
        defaultLocale: 'en',
        locales: ['en']
      },
      {
        domain: 'sportstats.us',
        defaultLocale: 'en-US',
        locales: ['en-US']
      },
      {
        domain: 'sportstats.ca',
        defaultLocale: 'en-CA',
        locales: ['en-CA', 'fr']
      },
      {
        domain: 'sportstats.th',
        defaultLocale: 'th',
        locales: ['th']
      },
      
    ],
  },
  fallbackLng: {
    default: ['en'],
  },
  nonExplicitSupportedLngs: true,
};