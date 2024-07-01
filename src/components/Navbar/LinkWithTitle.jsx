const LinkWithTitle = ({ title, link }) => {
  return (
    <a href={link} className="align_center">
      {title}
    </a>
  );
};

export default LinkWithTitle;
