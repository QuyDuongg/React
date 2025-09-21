const SingleQuestion = ({ id, title, info, onClick }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article 
      className='question' 
      id={`question-${id}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <header>
        <h4>{title}</h4>
        <button className='btn' onClick={(e) => {
          e.stopPropagation(); // Prevent triggering parent onClick
          setShowInfo(!showInfo);
        }}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {showInfo && <p>{info}</p>}
    </article>
  );
};
