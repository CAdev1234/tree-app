import React from 'react';
import {
  FaMinus,
  FaPlus,
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPen,
  FaPaperPlane,
  FaTimes

} from 'react-icons/fa';
interface FormattedIconProps {
  name?: string
}
const FormattedIcon:React.FC<FormattedIconProps> = ({ name }) => {
  switch (name) {
    case 'FaMinus':
      return <FaMinus />;
    case 'FaPlus':
      return <FaPlus />;
    case 'FaPen':
      return <FaPen />;
    case 'FaPaperPlane':
      return <FaPaperPlane />;
    case 'FaChevronUp':
      return <FaChevronUp />;
    case 'FaChevronDown':
      return <FaChevronDown />;
    case 'FaChevronLeft':
      return <FaChevronLeft />;
    case 'FaChevronRight':
      return <FaChevronRight />;
    default:
      return <FaTimes />;
  }
};

export default FormattedIcon;