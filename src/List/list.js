import simpleIcons from "simple-icons";

const getIcon = name => {
  const icon = simpleIcons.get(name);
  if (!icon) return {};
  const { svg, hex } = icon;
  return { svg, hex };
};

const list = [
  {
    title: "Netflix",
    cycle: "m",
    local: {
      title: {
        kr: "넷플릭스"
      }
    }
  },
  {
    title: "Amazon Prime Video",
    iconTitle: "Amazon",
    hex: "469bd3",
    local: {
      title: {
        kr: "아마존 프라임 비디오"
      }
    }
  },
  {
    title: "Codecademy",
    local: {
      title: {
        en: "Codecademy"
      }
    }
  },
  {
    title: "Amazon Prime",
    iconTitle: "amazon",
    local: {
      title: {
        kr: "아마존 프라임"
      }
    }
  },
  {
    title: "Adobe",
    icon: "Adobe"
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
    title: "Medium"
  },
  {
    title: "Youtube Premium",
    iconTitle: "youtube",
    local: {
      title: {
        kr: "유튜브 프리미엄"
      }
    }
  },
  {
    title: "Notion"
  },
  {
    title: "Bear"
  },
  {
    title: "Nintendo Online",
    iconTitle: "nintendo switch",
    local: {
      title: {
        kr: "닌텐도 온라인"
      }
    }
  },
  {
    title: "Apple Arcade",
    iconTitle: "apple",
    hex: "f05d42",
    local: {
      title: {
        kr: "애플 아케이드"
      }
    }
  },
  {
    title: "Apple Music",
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
  { title: "Spotify Premium", iconTitle: "spotify" },
  { title: "Hulu" },
  { title: "HBO Now" },
  { title: "Sketch" },
  {
    title: "Apple TV+",
    iconTitle: "apple",
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
    local: {
      title: {
        kr: "에버노트"
      }
    }
  }
];

const addedIconList = list.reduce((p, c) => {
  const icon = getIcon(c.iconTitle || c.title);
  let item = c;
  if (icon) item = { ...icon, ...c };

  return [...p, item];
}, []);

const sortedList = addedIconList.sort((_a, _b) => {
  const a = _a.title.toLocaleLowerCase();
  const b = _b.title.toLocaleLowerCase();

  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
});

export default sortedList;
