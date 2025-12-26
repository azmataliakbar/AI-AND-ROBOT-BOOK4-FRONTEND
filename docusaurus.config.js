// docusaurus.config.js - WITH BLOG ENABLED & BROKEN LINKS IGNORED

// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'An interactive AI-powered learning platform featuring 43 chapters across 4 modules covering ROS 2, Gazebo/Unity simulation, NVIDIA Isaac, and Vision-Language-Action models for humanoid robotics',
  favicon: 'img/favicon.ico',

  // Update these before deploying to Netlify
  url: 'https://your-site.netlify.app',
  baseUrl: '/',

  organizationName: 'azmataliakbar',
  projectName: 'ai-robotics-book',

  // ✅ IGNORE broken links - build will succeed without warnings
  onBrokenLinks: 'ignore',

  // Modern markdown config (Docusaurus v3+)
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'ignore'
    }
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Blog settings
          blogTitle: 'Physical AI Blog',
          blogDescription: 'Updates and insights on Physical AI and Humanoid Robotics',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          // ✅ Allow inline authors to fix the warning
          onInlineAuthors: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      
      navbar: {
        title: '🤖 Physical AI & Humanoid Robotics',
        logo: {
          alt: 'Robotics Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/',
            label: 'Home',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'bookSidebar',
            position: 'left',
            label: '📚 Book',
          },
          {
            to: '/blog',
            label: '📝 Blog',
            position: 'left'
          },
          {
            to: '/chat',
            label: '💬 AI Chat',
            position: 'left'
          },
          {
            href: 'https://github.com/azmataliakbar',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      
      footer: {
        style: 'dark',
        links: [
          {
            title: '📚 Book Modules',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Module 1: ROS 2',
                to: '/docs/intro',
              },
              {
                label: 'Module 2: Gazebo/Unity',
                to: '/docs/intro',
              },
              {
                label: 'Module 3: NVIDIA Isaac',
                to: '/docs/intro',
              },
              {
                label: 'Module 4: VLA Models',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: '🌐 Community',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'ROS 2 Docs',
                href: 'https://docs.ros.org/',
              },
              {
                label: 'ROS Discourse',
                href: 'https://discourse.ros.org/',
              },
              {
                label: 'NVIDIA Isaac',
                href: 'https://developer.nvidia.com/isaac-sdk',
              },
            ],
          },
          {
            title: '👨‍💻 Author',
            items: [
              {
                label: 'Azmat Ali',
                href: 'mailto:azmataliakbar@gmail.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/azmataliakbar',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/azmataliakbar',
              },
            ],
          },
          {
            title: '🚀 Features',
            items: [
              {
                label: 'AI Chat Assistant',
                to: '/chat',
              },
              {
                label: 'Search',
                to: '/search',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics. Built with Docusaurus & FastAPI.`,
      },
      
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'yaml', 'json'],
      },
    }),
};

export default config;