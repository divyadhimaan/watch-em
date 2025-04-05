import { IconType } from "react-icons";

import {
  HiChevronUp,
  HiChevronDown,
  HiChevronRight,
  HiChevronLeft,
  HiOutlineArrowPath,
  HiCheck,
  HiOutlineSun,
  HiOutlineMoon,
  HiMiniQuestionMarkCircle,
  HiMiniMinus,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiMiniPlus,
  HiMiniUser,
  HiMiniXMark,
  HiEyeDropper,
  HiOutlineClipboard,
  HiOutlineMagnifyingGlass,
  HiCalendar,
  HiOutlineLink,
  HiExclamationTriangle,
  HiArrowUpRight,
  HiInformationCircle,
  HiExclamationCircle,
  HiCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { FaRegPlayCircle, FaArrowAltCircleRight, FaLaughSquint, FaRocket, FaCompass, FaThumbsUp, FaHeart, FaGavel } from "react-icons/fa";

import { MdFamilyRestroom } from "react-icons/md";

import { LuSwords } from "react-icons/lu";

import { PiHouseDuotone, PiFilmSlateLight, PiFilmReelLight, PiBookOpenTextFill } from "react-icons/pi";

import { IoNotifications, IoSparkles } from "react-icons/io5";

import { RiVisaLine } from "react-icons/ri";

import { FaDiscord, FaGithub, FaGoogle, FaFireFlameCurved, FaFilm, FaGhost, FaMasksTheater } from "react-icons/fa6";

import { LuChevronsLeftRight } from "react-icons/lu";

export const iconLibrary: Record<string, IconType> = {
  arrowRight: FaArrowAltCircleRight,
  chevronUp: HiChevronUp,
  chevronDown: HiChevronDown,
  chevronRight: HiChevronRight,
  chevronLeft: HiChevronLeft,
  chevronsLeftRight: LuChevronsLeftRight,
  refresh: HiOutlineArrowPath,
  check: HiCheck,
  light: HiOutlineSun,
  dark: HiOutlineMoon,
  helpCircle: HiMiniQuestionMarkCircle,
  infoCircle: HiInformationCircle,
  warningTriangle: HiExclamationTriangle,
  errorCircle: HiExclamationCircle,
  checkCircle: HiCheckCircle,
  eyeDropper: HiEyeDropper,
  clipboard: HiOutlineClipboard,
  person: HiMiniUser,
  close: HiMiniXMark,
  openLink: HiOutlineLink,
  discord: FaDiscord,
  home: PiHouseDuotone,
  google: FaGoogle,
  github: FaGithub,
  arrowUpRight: HiArrowUpRight,
  minus: HiMiniMinus,
  movies: PiFilmSlateLight,
  notification: IoNotifications, 
  play: FaRegPlayCircle,
  plus: HiMiniPlus,
  calendar: HiCalendar,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  search: HiOutlineMagnifyingGlass,
  series: PiFilmReelLight,
  visa: RiVisaLine,
  security: HiOutlineShieldCheck,
  sparkle: HiOutlineSparkles,
  fire: FaFireFlameCurved,
  laugh: FaLaughSquint,
  family: MdFamilyRestroom,
  rocket: FaRocket,
  swords: LuSwords,
  compass: FaCompass,
  sparkles: IoSparkles,
  film: FaFilm,
  ghost: FaGhost,
  thumbsup: FaThumbsUp,
  heart: FaHeart,
  govel: FaGavel,
  theatre: FaMasksTheater,
  biography: PiBookOpenTextFill,
};
