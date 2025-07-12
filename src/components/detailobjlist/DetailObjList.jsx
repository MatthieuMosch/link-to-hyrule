import "./DetailObjList.css";

function DetailObjList ({description, items}) {
    return (
        items && items.length > 0 &&
        <table>
            <tr>
                <th colSpan="2">{description}</th>
            </tr>
            <tr>
                <th>Name</th>
                <th>Puzzle</th>
            </tr>
            {items.map(item => (
                <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item .puzzle}</td>
                </tr>
            ))}
        </table>
    );
}

export default DetailObjList;
