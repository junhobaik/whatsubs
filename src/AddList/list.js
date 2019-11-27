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
        price: "7900",
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

  // {
  //   title: "Apple Developer Program",
  //   ...getIconFromSimpleIcons("apple"),
  //   cycle: "y",
  //   local: {
  //     default: "en",
  //     en: {
  //       title: "Apple Developer Program",
  //       url: "https://developer.apple.com/programs/",
  //       price: "99",
  //       currency: "dollar"
  //     },
  //     kr: {
  //       title: "Apple Developer Program",
  //       url: "https://developer.apple.com/programs/",
  //       price: "129000",
  //       currency: "won"
  //     }
  //   }
  // },

  {
    title: "Codecademy",
    ...getIconFromSimpleIcons("codecademy"),
    cycle: "m",
    local: {
      default: "en",
      en: {
        title: "Codecademy",
        url: "https://www.codecademy.com/",
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
        price: "119",
        currency: "dollar"
      },
      kr: {
        title: "아마존 프라임",
        url: "https://www.amazon.com/",
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
        price: "9.9",
        currency: "dollar"
      },
      kr: {
        title: "Adobe Creative Cloud",
        url: "https://www.adobe.com/kr",
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
        price: "3.99",
        currency: "dollar"
      },
      kr: {
        title: "닌텐도 온라인",
        url: "https://www.nintendo.co.kr",
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
        price: "4.99",
        currency: "dollar"
      },
      kr: {
        title: "애플 아케이드",
        url: "https://www.apple.com/kr/apple-arcade",
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
        price: "9.99",
        currency: "dollar"
      },
      kr: {
        title: "애플 뮤직",
        url: "https://www.apple.com/kr/apple-music",
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
        price: "7.99",
        currency: "dollar"
      },
      kr: {
        title: "에버노트",
        url: "https://evernote.com",
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
        price: "5.99",
        currency: "dollar"
      },
      kr: {
        title: "Ulysses",
        url: "https://ulysses.app",
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
        price: "9.99",
        currency: "dollar"
      },
      kr: {
        title: "오피스 365",
        url: "https://products.office.com/",
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
        price: "11.99",
        currency: "dollar"
      },
      kr: {
        title: "드롭박스",
        url: "https://www.dropbox.com/",
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
        price: "0.99",
        currency: "dollar"
      },
      kr: {
        title: "아이클라우드",
        url: "https://www.icloud.com/",
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
        price: "1.99",
        currency: "dollar"
      },
      kr: {
        title: "Google One",
        url: "https://one.google.com/",
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
        price: "7",
        currency: "dollar"
      }
    }
  },

  // {
  //   title: "Disney+",
  //   cycle: "m",
  //   local: {
  //     default: "en",
  //     en: {
  //       title: "Disney+",
  //       url: "https://www.disneyplus.com/",
  //       price: "6.99",
  //       currency: "dollar"
  //     }
  //   }
  // }

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
        price: "7500",
        currency: "won"
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
