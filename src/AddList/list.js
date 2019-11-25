import React from "react";
import { View, Image } from "react-native";
import simpleIcons from "simple-icons";
import Svg, { Path } from "react-native-svg";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";
import { faSketch } from "@fortawesome/free-brands-svg-icons";

import img from "./img";

const getIconFromImg = key => {
  return {
    icon: (
      <Image
        style={{
          borderRadius: 3,
          width: 30,
          height: 30
        }}
        source={img[key.toLocaleLowerCase()]}
      />
    )
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
    ...getIconFromSimpleIcons("amazon"),
    hex: "#469bd3",
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

  {
    title: "Apple Developer Program",
    ...getIconFromSimpleIcons("apple"),
    cycle: "y",
    local: {
      default: "en",
      en: {
        title: "Apple Developer Program",
        url: "https://developer.apple.com/programs/",
        price: "99",
        currency: "dollar"
      },
      kr: {
        title: "Apple Developer Program",
        url: "https://developer.apple.com/programs/",
        price: "129000",
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

  // {
  //   title: "Watcha Play",
  //   local: {
  //     title: {
  //       kr: "왓챠 플레이"
  //     }
  //   }
  // },

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
        description: '국내 최다 4000만곡 보유, No.1 뮤직플랫폼 멜론! 실시간 차트부터 나를 아는 똑똑한 음악추천까지!',
        price: "10900",
        currency: "won"
      }
    }
  }

  // {
  //   title: "Genie",
  //   local: {
  //     title: {
  //       kr: "지니"
  //     }
  //   }
  // },

  // {
  //   title: "millie",
  //   local: {
  //     title: {
  //       kr: "밀리의 서재"
  //     }
  //   }
  // },

  // {
  //   title: "Disney+",
  //   local: {
  //     title: {
  //       kr: "디즈니+"
  //     }
  //   }
  // },

  // { title: "Hulu", ...getIconFromSimpleIcons("hulu") },
  // { title: "HBO Now" },

  // { title: "wavve" },

  // { title: "FLO" },
  // { title: "VIBE" },
];

const sortedList = list.sort((_a, _b) => {
  const a = _a.title.toLocaleLowerCase();
  const b = _b.title.toLocaleLowerCase();

  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
});

export default sortedList;
