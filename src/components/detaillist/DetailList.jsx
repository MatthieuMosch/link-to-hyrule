import "./DetailList.css";

function DetailList ({description, items}) {
    return (
        items && items.length > 0 &&
            <ul>
                <h4>{description}</h4>
                {items.map(item => (
                    <li key={item}>
                        {item}
                    </li>
                ))}
            </ul>
    );
}

export default DetailList;
