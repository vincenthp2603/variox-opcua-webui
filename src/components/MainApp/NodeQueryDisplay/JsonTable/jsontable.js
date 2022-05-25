import './jsontable.css';

const JsonTable = (props) => {
    let data = { ...props.data };
    return (
        <table>
            {
                Object.keys(data).map(key => {
                    if (typeof (data[key]) === 'object' && data[key]) {
                        return (
                            <tr>
                                <td><b>{key}</b></td>
                                <td>
                                    <JsonTable data={data[key]} />
                                </td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr>
                                <td><b>{key}</b></td>
                                <td>{data[key]}</td>
                            </tr>
                        )
                    }
                })
            }
        </table>
    )
}

export default JsonTable;