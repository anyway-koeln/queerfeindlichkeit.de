function Section({ children = null, heading = '', more = null }) {
    return (
        <section>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <h2>{heading}</h2>
                {more || null}
            </div>
            {children}
            <hr />
        </section>
    )
}

export default Section
