import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RulerLayer extends Component {
    static propTypes = {
        onUpdateRuler: PropTypes.func,
        onUpdateGrid: PropTypes.func,
        ticks: PropTypes.array,
        labels: PropTypes.array
    };

    componentWillMount() {
        this.props.onUpdateRuler();
        this.props.onUpdateGrid();
    }

    renderNums() {
        const { labels, dir } = this.props;
        return labels.map((label) => {
            switch (dir) {
                case "horizontal":
                    return <text x={label[1]} y={30 - label[0]} textAnchor="start" alignmentBaseline="hanging">{label[2]}</text>;
                case "vertical":
                    return <text x={30 - label[0]} y={label[1]} textAnchor="start" alignmentBaseline="hanging">{label[2]}</text>;
                default: break;
            }
        });
    }

    renderTicks() {
        const { ticks, dir } = this.props;
        return ticks.map((tick) => {
            switch (dir) {
                case "horizontal":
                    return (
                        <line
                            x1={tick[1]}
                            y1="30"
                            x2={tick[1]}
                            y2={30 - tick[0]}
                            stroke="black"
                        />
                    );
                case "vertical":
                    return (
                        <line
                            x1="30"
                            y1={tick[1]}
                            x2={30 - tick[0]}
                            y2={tick[1]}
                            stroke="black"
                        />
                    );
                default: break;
            }
        });
    }

    render() {
        const { dir } = this.props;
        return (
            <svg className="ruler"
                id={dir}
                width={window.innerWidth - 30 - 45}
                height={30}
            >
                {this.renderTicks()}
                {this.renderNums()}
            </svg>
        );
    }
}

export default RulerLayer;
