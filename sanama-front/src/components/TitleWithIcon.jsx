const TitleWithIcon = ({ name, Icon }) => {
  return (
    <div className="flex items-center justify-between w-fit mt-0 mb-4">
      {Icon && <Icon />}
      <h1
        className={`font-bold text-primary-periwinkle ml-${
          Icon ? "2" : "0"
        } text-6xl`}
      >
        {name}
      </h1>
    </div>
  );
};

export default TitleWithIcon;
