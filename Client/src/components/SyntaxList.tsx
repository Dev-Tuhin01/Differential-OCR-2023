import "./SyntaxList.css";

function SyntaxList() {
  const listItems = ["item1", "item2", "item3"];
  return (
    <div id="SyntaxList">
      <h2>Mathmetic Expression found: </h2>
      <ul>
        {listItems.map((items, index) => (
          <li key={index}>{items}</li>
        ))}
      </ul>
    </div>
  );
}

export default SyntaxList;
