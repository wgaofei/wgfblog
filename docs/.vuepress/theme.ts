import { hopeTheme } from 'vuepress-theme-hope'
import Navbar from './bar/Navbar'
import Sidebar from './bar/Sidebar'
export default hopeTheme({
  hostname: 'https://feilou.top',
  contributors: false,
  editLink: false,
  author: {
    name:'wgf',
    url: 'https://feilou.top',
  },
  repoDisplay: false,
  iconAssets: '//at.alicdn.com/t/c/font_3677319_fpxjwzfyufn.css',
  logo: '/logo2.png',
  footer: '<span style="font-weight:bold">💗 through hardships to the stars ✨</span>',
  copyright: 'Copyright © 2023-present GaoFei',
  pageInfo: [
    'Author',
    'Original',
    'Date',
    'Category',
    'Tag',
    'ReadingTime',
    'Word',
    'PageView',
  ],
  navbar: Navbar,
  sidebar: Sidebar,
  displayFooter: true,
  breadcrumb: false,
  blog: {
    roundAvatar: true,
    avatar:
      'https://feilou.oss-cn-nanjing.aliyuncs.com/images/image-20230112.jpg',
    description: `悲观者永远正确,乐观者永远胜利<br>
   <hr>
    💻开发工具:<br>
    <img src='https://img.shields.io/badge/-Windows-0078D6?style=flat-square&logo=Windows&logoColor=white'/>
    <img src='https://img.shields.io/badge/-IntelliJ IDEA-000?style=flat-square&logo=IntelliJ IDEA&logoColor=white'/>
    <img src='https://img.shields.io/badge/-WebStorm-000?style=flat-square&logo=WebStorm&logoColor=white'/>
    <img src='https://img.shields.io/badge/-Notepad++-90E59A?style=flat-square&logo=Notepad%2B%2B&logoColor=black'/>
    <img src='https://img.shields.io/badge/-Google Chrome-4285F4?style=flat-square&logo=Google Chrome&logoColor=white'/>
    <br>
    <hr>
    👌正在使用:<br>
    <img src='https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=black'/>
    <img src='https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white'/>
    <img src='https://img.shields.io/badge/-Redis-DC382D?style=flat-square&logo=Redis&logoColor=black'/>
    <img src='https://img.shields.io/badge/-Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white'/>
    <img src='https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=Git&logoColor=white'/>
    <img src='https://img.shields.io/badge/-Linux-FCC624?style=flat-square&logo=Linux&logoColor=black'/>
    <br>
    <hr>
    💪正在学习:<br>
    <img src='https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white'/>
    <img src='https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white'/>
    <img src='https://img.shields.io/badge/-Kafka-231F20?style=flat-square&logo=Apache Kafka&logoColor=white'/>
    <img src='https://img.shields.io/badge/-Adobe Lightroom-31A8FF?style=flat-square&logo=Adobe Lightroom&logoColor=white'/>
    <img src='https://img.shields.io/badge/-Nikon-FFE100?style=flat-square&logo=nikon&logoColor=white'/>
    <hr>
    `,
    medias: {
      Github: 'https://github.com/wgaofei',
      Gitee: 'https://gitee.com/feilou',
    },
  },
  encrypt: {
    config: {},
  },
  plugins: {
    copyright: true,
    blog: {
      excerpt: false,
    },
    components: {
      components: ['Badge', 'CodePen', 'PDF', 'BiliBili'],
    },
    mdEnhance: {
      // 启用流程图
      flowchart: true,
      codetabs: true,
      container: true,
      demo: {
        jsfiddle: false,
        codepen: false,
      },
      align: true,
      imageSize: true,
      figure: true,
      mark: true,
      tabs: true,
      tasklist: true,
    },
  },
})
