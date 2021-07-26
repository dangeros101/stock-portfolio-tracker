import PropTypes from 'prop-types'

const Button = ({color, background, text, onClick}) => {
    return (
        <>
            <button type="button" style={{ color: color, backgroundColor: background, border: 'none' }} onClick={onClick}>{text}</button>  
        </>
    )
}

Button.defaultProps = {
    color: '#fff',
    background: '#424294'
}

Button.propTypes = {
    color: PropTypes.string,
    background: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
