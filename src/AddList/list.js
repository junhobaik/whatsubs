import React from "react";
import { View } from "react-native";
import simpleIcons from "simple-icons";
import Svg, { Path } from "react-native-svg";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faSketch } from "@fortawesome/free-brands-svg-icons";

import img from "./img";
import IconImage from "./IconImage";

const getIconFromImg = key => {
  return {
    icon: <IconImage source={img[key.toLocaleLowerCase()]} />
  };
};

const getIconFromFontAwesome = icon => {
  return {
    icon: (
      <View>
        <Fa
          icon={icon}
          style={{ color: "#fff", width: 25, height: 25 }}
          size={20}
        />
      </View>
    )
  };
};

const getIconFromSimpleIcons = name => {
  const simpleIcon = simpleIcons.get(name);
  if (!simpleIcon) return {};

  const { svg, hex } = simpleIcon;
  const path = svg.split(`<path d=\"`)[1].split('"/>')[0];
  let icon;

  icon = (
    <Svg
      height="25"
      width="25"
      style={{
        alignItems: "center"
      }}
    >
      <Path d={path} fill="#fff" />
    </Svg>
  );

  return { icon, hex: `#${hex}` };
};

const list = [
  {
    title: "Netflix",
    ...getIconFromSimpleIcons("netflix"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Netflix",
        url: "https://www.netflix.com",
        description: "Watch Netflix movies & TV shows online.",
        price: "13",
        currency: "dollar"
      },
      kr: {
        title: "넷플릭스",
        url: "https://www.netflix.com",
        description: "전 세계의 인기 TV 시리즈와 영화를 Netflix에서 만나보세요",
        price: "12000",
        currency: "won"
      }
    }
  },

  {
    title: "Amazon Prime Video",
    ...getIconFromImg("amazonprime"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Amazon Prime Video",
        url: "https://www.primevideo.com/",
        description:
          "Enjoy exclusive Amazon Originals as well as popular movies and TV shows",
        price: "5.99",
        currency: "dollar"
      },
      kr: {
        title: "아마존 프라임 비디오",
        url: "https://www.primevideo.com/",
        description:
          "독점 아마존 오리지널, 인기 영화 및 TV 프로그램을 즐길 수 있습니다",
        price: "5.99",
        currency: "dollar"
      }
    }
  },

  {
    title: "Youtube Premium",
    ...getIconFromSimpleIcons("youtube"),
    local: {
      default: "en",
      en: {
        title: "Youtube Premium",
        url: "https://www.youtube.com",
        description:
          "Enjoy the videos and music you love, upload original content, and share it all",
        price: "11.99",
        currency: "dollar"
      },
      kr: {
        title: "유튜브 프리미엄",
        url: "https://www.youtube.com",
        description:
          "YouTube에서 마음에 드는 동영상과 음악을 감상하고, 직접 만든 콘텐츠를 업로드하여 친구, 가족뿐 아니라 전 세계 사람들과 콘텐츠를 공유할 수 있습니다.",
        price: "8690",
        currency: "won"
      }
    }
  },

  {
    title: "Setapp",
    ...getIconFromImg("setapp"),
    local: {
      default: "en",
      en: {
        title: "Setapp",
        url: "https://setapp.com",
        description:
          "The frontier platform that packs 160+ Mac apps into just one",
        price: "9.99",
        currency: "dollar"
      }
    }
  },

  {
    title: "Bugs",
    ...getIconFromImg("bugs"),
    local: {
      default: "kr",
      kr: {
        title: "벅스",
        url: "https://music.bugs.co.kr/",
        description:
          "벅스 4천만곡 음악서비스, 슈퍼사운드, 고음질, FLAC, 최신 인기가요, 뮤직PD, 커넥트, 페이코, 추천 플레이리스트, 추천 선곡, 테마 음악",
        price: "7900",
        currency: "won"
      }
    }
  },

  {
    title: "Codecademy",
    ...getIconFromSimpleIcons("codecademy"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Codecademy",
        url: "https://www.codecademy.com/",
        description:
          "Learn the technical skills you need for the job you want.",
        price: "15.99",
        currency: "dollar"
      }
    }
  },

  {
    title: "Amazon Prime",
    ...getIconFromSimpleIcons("amazon"),
    cycle: "y",
    local: {
      default: "en",
      en: {
        title: "Amazon Prime",
        url: "https://www.amazon.com/",
        description:
          "Get fast, free delivery with Amazon Prime. Prime members enjoy FREE Two-Day Delivery and exclusive access to music, movies, TV shows, original audio series, and Kindle books.",
        price: "119",
        currency: "dollar"
      }
    }
  },

  {
    title: "Adobe Creative Cloud",
    ...getIconFromSimpleIcons("adobe"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Adobe Creative Cloud",
        url: "https://www.adobe.com",
        description:
          "Enjoy the entire collection of our creative desktop and mobile tools, like Photoshop, Illustrator, InDesign, Adobe Premiere Pro, and more with Adobe Creative Cloud",
        price: "9.9",
        currency: "dollar"
      },
      kr: {
        title: "Adobe Creative Cloud",
        url: "https://www.adobe.com/kr",
        description:
          "Adobe Creative Cloud를 통해 Photoshop, Illustrator, InDesign, Adobe Premiere Pro 등 모든 크리에이티브 데스크탑 및 모바일 툴을 사용할 수 있습니다",
        price: "11000",
        currency: "won"
      }
    }
  },

  {
    title: "Medium",
    ...getIconFromSimpleIcons("medium"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Medium",
        url: "https://medium.com",
        description:
          "Medium is not like any other platform on the internet. Our sole purpose is to help you find compelling ideas, knowledge, and perspectives.",
        price: "5",
        currency: "dollar"
      }
    }
  },

  {
    title: "Nintendo Online",
    ...getIconFromSimpleIcons("nintendo switch"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Nintendo Online",
        url: "https://www.nintendo.com",
        description:
          "Learn all about the different benefits of the paid online service for the Nintendo Switch system.",
        price: "3.99",
        currency: "dollar"
      },
      kr: {
        title: "닌텐도 온라인",
        url: "https://www.nintendo.co.kr",
        description:
          "닌텐도 온라인에 가입하면 닌텐도 스위치 시스템에 대한 유료 온라인 서비스의 다양한 이점을 누릴 수 있습니다.",
        price: "4900",
        currency: "won"
      }
    }
  },

  {
    title: "Apple Arcade",
    ...getIconFromSimpleIcons("apple"),
    hex: "#f05d42",
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Apple Arcade",
        url: "https://www.apple.com/apple-arcade",
        description:
          "Apple Arcade is a game subscription service unlike any other, with 100+ incredibly fun new games designed with the world's most innovative developers",
        price: "4.99",
        currency: "dollar"
      },
      kr: {
        title: "애플 아케이드",
        url: "https://www.apple.com/kr/apple-arcade",
        description:
          "여태껏 경험해본 적 없는, 전혀 색다른 게임 구독 서비스인 Apple 아케이드. 세계에서 가장 혁신적인 제작자들이 심혈을 기울여 완성한 100개 이상의 미치도록 재밌는 게임을 즐기세요.",
        price: "6500",
        currency: "won"
      }
    }
  },

  {
    title: "Apple Music",
    ...getIconFromSimpleIcons("apple music"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Apple Music",
        url: "https://www.apple.com/apple-music",
        description:
          "Stream 60 million songs, ad-free on Apple Music. Shop HomePod, AirPods, and headphones. And build your entertainment collection with iPod and iTunes",
        price: "9.99",
        currency: "dollar"
      },
      kr: {
        title: "애플 뮤직",
        url: "https://www.apple.com/kr/apple-music",
        description: "Apple Music에서 6천만 곡 이상을 스트리밍으로 즐겨보세요.",
        price: "8900",
        currency: "won"
      }
    }
  },

  {
    title: "Apple TV+",
    ...getIconFromSimpleIcons("apple"),
    hex: "#2c2c2c",
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Apple TV+",
        url: "https://www.apple.com/apple-tv-plus/",
        description:
          "Apple TV+ features shows and movies from the world's most creative storytellers. Watch on the Apple TV app.",
        price: "4.99",
        currency: "dollar"
      }
    }
  },

  {
    title: "Sketch",
    ...getIconFromFontAwesome(faSketch),
    hex: "#f1b03e",
    cycle: "y",
    local: {
      default: "en",
      en: {
        title: "Sketch",
        url: "https://www.sketch.com",
        description:
          "Sketch is a design toolkit built to help you create your best work — from your earliest ideas, through to final artwork.",
        price: "99",
        currency: "dollar"
      }
    }
  },

  {
    title: "Spotify Premium",
    ...getIconFromSimpleIcons("spotify"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Spotify Premium",
        url: "https://www.spotify.com/",
        description:
          "Play millions of songs ad-free, on-demand, and offline. VIEW PLANS. Why go Premium? Download music. Listen anywhere.",
        price: "9.99",
        currency: "dollar"
      }
    }
  },

  {
    title: "Evernote",
    ...getIconFromSimpleIcons("evernote"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Evernote",
        url: "https://evernote.com/",
        description:
          "Take notes anywhere. Find information faster. Share ideas with anyone. Meeting notes, web pages, projects, to-do lists",
        price: "7.99",
        currency: "dollar"
      },
      kr: {
        title: "에버노트",
        url: "https://evernote.com",
        description:
          "노트 필기 앱 Evernote는 아이디어를 캡처하고 프로젝트와 할 일 목록의 우선 순위를 지정해 빈틈없이 관리할 수 있도록 도와줍니다.",
        price: "6000",
        currency: "won"
      }
    }
  },

  {
    title: "Ulysses",
    ...getIconFromImg("ulysses"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Ulysses",
        url: "https://ulysses.app",
        description:
          "A pleasant, focused writing experience combined with effective document management, fast syncing and flexible export make Ulysses the first choice for writers of all kinds.",
        price: "5.99",
        currency: "dollar"
      },
      kr: {
        title: "Ulysses",
        url: "https://ulysses.app",
        description:
          "Ulysses는 Mac과 iPhone, iPad를 위한 통합 글쓰기 환경입니다. 쾌적하고 집중이 잘 되는 글쓰기 경험, 효과적인 문서 관리와 매끄러운 데이터 동기화, 유연한 문서 내보내기 등 모든 종류의 작가들을 만족시키는 최상의 선택이 되어드릴 것입니다.",
        price: "6500",
        currency: "won"
      }
    }
  },

  {
    title: "Notion",
    ...getIconFromSimpleIcons("notion"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Notion",
        url: "https://www.notion.so",
        description:
          "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.",
        price: "4",
        currency: "dollar"
      }
    }
  },

  {
    title: "Bear",
    ...getIconFromImg("bear"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Bear",
        url: "https://bear.app",
        description:
          "Bear is a focused, flexible writing app for iPhone, iPad, Mac and Apple Watch used by everyone from bloggers and web developers to aspiring authors and ...",
        price: "1.49",
        currency: "dollar"
      }
    }
  },

  {
    title: "Coupang RocketWow",
    ...getIconFromImg("coupang"),
    cycle: "m",
    local: {
      default: "kr",
      kr: {
        title: "쿠팡 로켓와우",
        url: "https://www.coupang.com",
        description:
          "쿠팡 로켓와우를 통해 회원 전용 특가, 무료 배송 등의 혜택을 누리세요.",
        price: "2900",
        currency: "won"
      }
    }
  },

  {
    title: "Melon",
    ...getIconFromImg("melon"),
    cycle: "m",
    local: {
      default: "kr",
      kr: {
        title: "멜론",
        url: "https://www.melon.com",
        description:
          "국내 최다 4000만곡 보유, No.1 뮤직플랫폼 멜론! 실시간 차트부터 나를 아는 똑똑한 음악추천까지!",
        price: "10900",
        currency: "won"
      }
    }
  },

  {
    title: "Genie",
    ...getIconFromImg("genie"),
    local: {
      default: "kr",
      kr: {
        title: "지니",
        url: "https://www.genie.co.kr/",
        description:
          "국내 최다 음원 보유, FLAC 고음질, 지니차트, 최신음악, 앨범, 뮤직비디오, 오늘의 선곡, TV속음악, 시대별음악, 지니라이프 등 제공",
        price: "10800",
        currency: "won"
      }
    }
  },

  {
    title: "laftel",
    ...getIconFromImg("laftel"),
    cycle: "m",
    local: {
      default: "kr",
      kr: {
        title: "라프텔",
        url: "https://laftel.net/",
        description:
          "고화질 신작 애니 스트리밍. 불법 사이트는 이제 그만! 취향에 맞춘 애니 추천은 라프텔",
        price: "9900",
        currency: "won"
      }
    }
  },

  {
    title: "Watcha Play",
    ...getIconFromImg("watcha"),
    cycle: "m",
    local: {
      default: "kr",
      kr: {
        title: "왓챠 플레이",
        url: "https://play.watcha.net/",
        description:
          "모든 영화, 드라마, 다큐멘터리, 애니메이션을 언제 어디서나 최고의 화질로 무제한 감상하세요",
        price: "7900",
        currency: "won"
      }
    }
  },

  {
    title: "millie",
    ...getIconFromImg("millie"),
    cycle: "m",
    local: {
      default: "kr",
      kr: {
        title: "밀리의 서재",
        url: "https://www.millie.co.kr/",
        description:
          "시간을 더 가치 있게. “무제한 전자책, 서점에서도 볼 수 없는 종이책까지 읽다 보니 지루할 틈이 없어요!”",
        price: "9900",
        currency: "won"
      }
    }
  },

  {
    title: "Office 365",
    ...getIconFromImg("office365"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Office 365",
        url: "https://products.office.com/",
        description:
          "With an Office 365 subscription, you get the latest Office apps—both the desktop and ... Office 365 + your device + the Internet = productivity wherever you are.",
        price: "9.99",
        currency: "dollar"
      },
      kr: {
        title: "오피스 365",
        url: "https://products.office.com/",
        description:
          "모든 장치에서 활용할 수 있습니다. 데스크톱, 태블릿 및 휴대폰에서 활용할 수 있습니다. Office 365, 장치, 인터넷이 결합되어 어디서라도 생산성을 유지할 수 있습니다.",
        price: "11900",
        currency: "won"
      }
    }
  },

  {
    title: "Dropbox",
    ...getIconFromSimpleIcons("dropbox"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Dropbox",
        url: "https://www.dropbox.com/",
        description:
          "Dropbox is a modern workspace designed to reduce busywork-so you can focus on the ... Dropbox is the world's first smart workspace. ... ",
        price: "11.99",
        currency: "dollar"
      },
      kr: {
        title: "드롭박스",
        url: "https://www.dropbox.com/",
        description:
          "Dropbox는 세계 최초의 스마트 작업 공간입니다. 팀의 모든 콘텐츠를 한 곳에서 평소 애용하는 도구와 함께 사용할 수 있는 것은 물론, 모든 것이 깔끔하게 정리되어 ...",
        price: "11.99",
        currency: "dollar"
      }
    }
  },

  {
    title: "iCloud",
    ...getIconFromSimpleIcons("icloud"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "iCloud",
        url: "https://www.icloud.com/",
        description:
          "Sign in to iCloud to access your photos, videos, documents, notes, contacts, and more. Use your Apple ID or create a new account to start using Apple services.",
        price: "0.99",
        currency: "dollar"
      },
      kr: {
        title: "아이클라우드",
        url: "https://www.icloud.com/",
        description:
          "iCloud는 모든 Apple 기기 안에 기본으로 내장되어 있습니다. 즉 사진, 파일, 메모 등 당신의 소중한 것들을 언제나 최신 상태로 안전하게 보관하고, 어디서든 사용할 ...",
        price: "1100",
        currency: "won"
      }
    }
  },

  {
    title: "Google One",
    ...getIconFromImg("googleone"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Google One",
        url: "https://one.google.com/",
        description:
          "Get expanded cloud storage, access to help from Google experts, and more benefits — in one simple plan that you can share with your family.",
        price: "1.99",
        currency: "dollar"
      },
      kr: {
        title: "Google One",
        url: "https://one.google.com/",
        description:
          "하나의 멤버십으로 Google을 최대한 활용하세요 확장 스토리지, 전문가와의 상담 등 다양한 혜택을 공유 가능한 하나의 요금제로 만나보세요.",
        price: "2400",
        currency: "won"
      }
    }
  },

  {
    title: "Github",
    ...getIconFromSimpleIcons("github"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Github",
        url: "https://github.com/",
        description:
          "GitHub brings together the world's largest community of developers to discover, share, and build better software. From open source projects to private team ...",
        price: "7",
        currency: "dollar"
      }
    }
  },

  {
    title: "Hulu",
    ...getIconFromSimpleIcons("hulu"),
    local: {
      default: "en",
      en: {
        title: "Hulu",
        url: "https://www.hulu.com/",
        description:
          "Watch TV shows and movies online. Stream TV episodes of South Park, Empire, SNL, Modern Family and popular movies on your favorite devices",
        price: "5.99",
        currency: "dollar"
      }
    }
  },

  {
    title: "wavve",
    ...getIconFromImg("wavve"),
    cycle: "m",
    local: {
      default: "kr",
      kr: {
        title: "wavve",
        url: "https://www.wavve.com/",
        description:
          "회원 가입만으로 지상파를 포함한 모든 LIVE가 무료, 20만편 이상의 방송과 해외 드라마, 시대를 뛰어넘는 명작에서 최신 영화까지",
        price: "7900",
        currency: "won"
      }
    }
  },

  {
    title: "Flo",
    ...getIconFromImg("flo"),
    cycle: "m",
    local: {
      default: "kr",
      kr: {
        title: "Flo",
        url: "https://www.music-flo.com/",
        description:
          "음악을 들을수록 나를 더 닮아가는 나만의 FLO. 지금, 당신의 음악.",
        price: "7900",
        currency: "won"
      }
    }
  },

  {
    title: "Vibe",
    ...getIconFromImg("vibe"),
    cycle: "m",
    local: {
      default: "kr",
      kr: {
        title: "VIBE",
        url: "https://vibe.naver.com/",
        description:
          "좋아하는 음악은 물론, 좋아할 음악까지 들려주는 취향 저격 뮤직 서비스.",
        price: "7500",
        currency: "won"
      }
    }
  },

  {
    title: "Stadia",
    ...getIconFromSimpleIcons("stadia"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Statia",
        url: "https://store.google.com/product/stadia",
        description:
          "Play Stadia with Premiere Edition. Get access to Stadia at launch, three free months of Stadia Pro and play in up to 4K on your TV with Chromecast Ultra.",
        price: "9.99",
        currency: "dollar"
      }
    }
  },

  {
    title: "Slack",
    ...getIconFromSimpleIcons("slack"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Slack",
        url: "https://store.google.com/product/stadia",
        description:
          "Slack is where work flows. It's where the people you need, the information you share, and the tools you use come together to get things done.",
        price: "6.67",
        currency: "dollar"
      }
    }
  }
];

const sortedList = list.sort((_a, _b) => {
  const a = _a.title.toLocaleLowerCase();
  const b = _b.title.toLocaleLowerCase();

  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
});

export default sortedList;
