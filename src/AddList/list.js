import React from "react";
import { View, Image } from "react-native";
import simpleIcons from "simple-icons";
import Svg, { Path } from "react-native-svg";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-native-fontawesome";

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
        <Fa icon={icon} style={{ color: "#fff", width: 25, height: 25 }} />
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
          "Enjoy exclusive Amazon Originals as well as popular movies and TV shows",
        price: "11.99",
        currency: "dollar"
      },
      kr: {
        title: "유튜브 프리미엄",
        url: "https://www.youtube.com",
        description:
          "독점 아마존 오리지널, 인기 영화 및 TV 프로그램을 즐길 수 있습니다",
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
  }

  // {
  //   title: "Codecademy",
  //   ...getIconFromSimpleIcons("codecademy"),
  //   local: {
  //     title: {
  //       en: "Codecademy"
  //     }
  //   }
  // },

  // {
  //   title: "Amazon Prime",
  //   ...getIconFromSimpleIcons("amazon"),
  //   local: {
  //     title: {
  //       kr: "아마존 프라임"
  //     }
  //   }
  // },

  // {
  //   title: "Adobe",
  //   ...getIconFromSimpleIcons("adobe")
  // },

  // {
  //   title: "Watcha Play",
  //   local: {
  //     title: {
  //       kr: "왓챠 플레이"
  //     }
  //   }
  // },

  // {
  //   title: "Medium",
  //   ...getIconFromSimpleIcons("medium")
  // },

  // {
  //   title: "Notion",
  //   ...getIconFromSimpleIcons("notion")
  // },

  // {
  //   title: "Bear",
  //   ...getIconFromImg("bear")
  // },

  // {
  //   title: "Nintendo Online",
  //   ...getIconFromSimpleIcons("nintendo switch"),
  //   local: {
  //     title: {
  //       kr: "닌텐도 온라인"
  //     }
  //   }
  // },

  // {
  //   title: "Apple Arcade",
  //   ...getIconFromSimpleIcons("apple"),
  //   hex: "#f05d42",
  //   local: {
  //     title: {
  //       kr: "애플 아케이드"
  //     }
  //   }
  // },

  // {
  //   title: "Apple Music",
  //   ...getIconFromSimpleIcons("apple music"),
  //   local: {
  //     title: {
  //       kr: "애플 뮤직"
  //     }
  //   }
  // },

  // {
  //   title: "Coupang RocketWow",
  //   ...getIconFromImg("coupang"),
  //   local: {
  //     title: {
  //       kr: "쿠팡 로켓와우"
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

  // { title: "Spotify Premium", ...getIconFromSimpleIcons("spotify") },
  // { title: "Hulu", ...getIconFromSimpleIcons("hulu") },
  // { title: "HBO Now" },
  // { title: "Sketch", ...getIconFromFontAwesome(faSketch), hex: "#f1b03e" },
  // {
  //   title: "Apple TV+",
  //   ...getIconFromSimpleIcons("apple"),
  //   hex: "#2c2c2c",
  //   local: {
  //     title: {
  //       kr: "애플 TV+"
  //     }
  //   }
  // },

  // { title: "wavve" },
  // {
  //   title: "Melon",
  //   ...getIconFromImg("melon"),
  //   local: {
  //     title: {
  //       kr: "멜론"
  //     }
  //   }
  // },

  // {
  //   title: "Genie",
  //   local: {
  //     title: {
  //       kr: "지니"
  //     }
  //   }
  // },

  // { title: "FLO" },
  // { title: "VIBE" },
  // {
  //   title: "Evernote",
  //   ...getIconFromSimpleIcons("evernote"),
  //   local: {
  //     title: {
  //       kr: "에버노트"
  //     }
  //   }
  // }
];

const sortedList = list.sort((_a, _b) => {
  const a = _a.title.toLocaleLowerCase();
  const b = _b.title.toLocaleLowerCase();

  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
});

export default sortedList;
