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
    cycle: "m"
  },
  {
    title: "Amazon Prime Video",
    iconTitle: "Amazon",
    cycle: "m"
  },
  {
    title: "Adobe",
    icon: "Adobe"
  },
  {
    title: "Watcha Play",
    cycle: "m"
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
    iconTitle: "youtube"
  },
  {
    title: "Notion"
  },
  {
    title: "Bear"
  },
  {
    title: "Nintendo Online",
    iconTitle: "nintendo switch"
  },
  {
    title: "Apple Arcade",
    iconTitle: "apple",
    hex: "f05d42"
  },
  {
    title: "Apple Music"
  },
  {
    title: "Coupang RocketWow"
  },
  {
    title: "millie"
  },
  {
    title: "Disney+"
  },
  { title: "Spotify Premium", iconTitle: "spotify" },
  { title: "Hulu" },
  { title: "HBO Now" },
  { title: "Sketch" },
  {
    title: "Apple TV+",
    iconTitle: "apple",
    hex: "2c2c2c"
  },
  { title: "wavve" },
  { title: "Melon" },
  { title: "Bugs" },
  { title: "Genie" },
  { title: "FLO" },
  { title: "VIBE" }
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
