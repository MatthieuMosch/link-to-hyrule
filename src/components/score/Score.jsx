import "./Score.css";

function Score({min, max, score}) {
    const perc = 100-score/(max-min)*100;
    return (
        <div className="score-container">
            <div style={{top: 'calc(' + perc + '% - 0.75em)'}} className="score-left">▶</div>
            <div style={{top: 'calc(' + perc + '% - 0.75em)'}} className="score-right">◀</div>
            <div className="score-bar">
                <p className="max-score">{max}</p>
                <p className="min-score" >{min}</p>
            </div>
        </div>
    );
}

export default Score;
