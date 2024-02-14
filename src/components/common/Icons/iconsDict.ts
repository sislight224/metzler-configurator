import { FC } from 'react';
import { IconProps } from './IconProps';
import AcademicIcon from './AcademicIcon';
import BackArrowIcon from './BackArrowIcon';
import ColorSwatchIcon from './ColorSwatchIcon';
import DummyIcon from './DummyIcon';
import FileIcon from './FileIcon';
import HomeIcon from './HomeIcon';
import LibraryIcon from './LibraryIcon';
import RulerIcon from './RulerIcon';
import SaveIcon from './SaveIcon';
import ReloadIcon from './ReloadIcon';
import UndoIcon from './UndoIcon';
import RedoIcon from './RedoIcon';
import PlusIcon from './PlusIcon';
import MinusIcon from './MinusIcon';
import CopyIcon from './CopyIcon';
import CloseIcon from './CloseIcon';
import OpenIcon from './OpenIcon';
import PrinterIcon from './PrinterIcon';
import ChevronDown from './ChevronDown';
import InfoIcon from './InfoIcon';
import DotsIcon from './DotsIcon';
import WarningIcon from './WarningIcon';

const iconsDict: Record<string, FC<IconProps>> = {
  AcademicIcon,
  BackArrowIcon,
  ColorSwatchIcon,
  DummyIcon,
  FileIcon,
  HomeIcon,
  WarningIcon,
  LibraryIcon,
  RulerIcon,
  SaveIcon,
  ReloadIcon,
  UndoIcon,
  RedoIcon,
  PlusIcon,
  MinusIcon,
  CopyIcon,
  CloseIcon,
  OpenIcon,
  PrinterIcon,
  ChevronDown,
  InfoIcon,
  DotsIcon,
};

export default iconsDict;
