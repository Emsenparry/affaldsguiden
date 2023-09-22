
// Layout opdatere websidens titel baseret på den værdi, der er angivet i props.title. 
const Layout = props => {
    // Sætter page title på alle sider ved hjælp af props.
    document.title = props.title

    return(
        <>
        {/* props.children repræsenterer indholdet, der skal vises inde i layoutet. */}
            <div>{props.children}</div>
        </>
    )
}


export { Layout }