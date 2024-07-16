import classNames from 'classnames';
import { PureComponent } from 'react';
import { CheckerboardProps } from './Checkerboard.type';
import './Checkerboard.scss';

export default class Checkerboard extends PureComponent<CheckerboardProps> {
    static defaultProps = { size: '50px' };

    render () {
        const { size, isActive, flag, posY, posX, onClickCheckerboard } = this.props;
        return (
            <div
                // 为胜利时在一条线上的点添加高亮样式
                className={classNames('checkerboard-container', { 'active-checkerboard': isActive })}
                style={{ width: size, height: size }  }
                onClick={ () => onClickCheckerboard({ posY, posX }) }
            >
                { flag }
            </div>
        );
    }
}
