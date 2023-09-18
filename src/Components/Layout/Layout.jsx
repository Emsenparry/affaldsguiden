const Layout = props => {
    // Sætter page title
    document.title = props.title

    // Sætter page description hvis der er en
    if(props.description) {
        document.querySelector('meta[name="description"]')
            .setAttribute('content', props.description)
    }

    return(
        <>
            <div>{props.children}</div>
        </>
    )
}


export { Layout }