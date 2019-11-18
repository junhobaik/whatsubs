import React from "react";
import simpleIcons from "simple-icons";
import Svg, { Path } from "react-native-svg";

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

  return { icon, hex };
};

const list = [
  {
    title: "Netflix",
    ...getIconFromSimpleIcons("netflix"),
    cycle: "m",
    local: {
      title: {
        kr: "넷플릭스"
      }
    }
  },
  {
    title: "Amazon Prime Video",
    ...getIconFromSimpleIcons("amazon"),
    hex: "469bd3",
    local: {
      title: {
        kr: "아마존 프라임 비디오"
      }
    }
  },
  {
    title: "Codecademy",
    ...getIconFromSimpleIcons("codecademy"),
    local: {
      title: {
        en: "Codecademy"
      }
    }
  },
  {
    title: "Amazon Prime",
    ...getIconFromSimpleIcons("amazon"),
    local: {
      title: {
        kr: "아마존 프라임"
      }
    }
  },
  {
    title: "Adobe",
    ...getIconFromSimpleIcons("adobe")
  },
  {
    title: "Watcha Play",
    local: {
      title: {
        kr: "왓챠 플레이"
      }
    }
  },
  {
    title: "SetApp",
    cycle: "m"
  },
  {
    title: "Medium",
    ...getIconFromSimpleIcons("medium")
  },
  {
    title: "Youtube Premium",
    ...getIconFromSimpleIcons("youtube"),
    local: {
      title: {
        kr: "유튜브 프리미엄"
      }
    }
  },
  {
    title: "Notion",
    ...getIconFromSimpleIcons("notion")
  },
  {
    title: "Bear"
  },
  {
    title: "Nintendo Online",
    ...getIconFromSimpleIcons("nintendo switch"),
    local: {
      title: {
        kr: "닌텐도 온라인"
      }
    }
  },
  {
    title: "Apple Arcade",
    ...getIconFromSimpleIcons("apple"),
    hex: "f05d42",
    local: {
      title: {
        kr: "애플 아케이드"
      }
    }
  },
  {
    title: "Apple Music",
    ...getIconFromSimpleIcons("apple music"),
    local: {
      title: {
        kr: "애플 뮤직"
      }
    }
  },
  {
    title: "Coupang RocketWow",
    local: {
      title: {
        kr: "쿠팡 로켓와우"
      }
    }
  },
  {
    title: "millie",
    local: {
      title: {
        kr: "밀리의 서재"
      }
    }
  },
  {
    title: "Disney+",
    local: {
      title: {
        kr: "디즈니+"
      }
    }
  },
  { title: "Spotify Premium", ...getIconFromSimpleIcons("spotify") },
  { title: "Hulu", ...getIconFromSimpleIcons("hulu") },
  { title: "HBO Now" },
  { title: "Sketch" },
  {
    title: "Apple TV+",
    ...getIconFromSimpleIcons("apple"),
    hex: "2c2c2c",
    local: {
      title: {
        kr: "애플 TV+"
      }
    }
  },
  { title: "wavve" },
  {
    title: "Melon",
    local: {
      title: {
        kr: "멜론"
      }
    }
  },
  {
    title: "Bugs",
    local: {
      title: {
        kr: "벅스"
      }
    }
  },
  {
    title: "Genie",
    local: {
      title: {
        kr: "지니"
      }
    }
  },
  { title: "FLO" },
  { title: "VIBE" },
  {
    title: "Evernote",
    ...getIconFromSimpleIcons("evernote"),
    local: {
      title: {
        kr: "에버노트"
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
