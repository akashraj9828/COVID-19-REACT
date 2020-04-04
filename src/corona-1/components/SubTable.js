import React from "react"
import DataTable from 'react-data-table-component';

function SubTable(props) {
    const data = props.data
    console.log(data);
    
    if (!data) {
        return (<div>No data!</div>)
    }
    const district_data = data.district_wise
    if(!district_data){
        
        return (<div>No data!</div>)
    }
    let all_keys = Object.keys(district_data)
    // console.log(all_keys);

    let dataTable_data = []
    let columns = {}
    for (let key in all_keys) {
        let i=parseInt(key)+1
        key = all_keys[key]
        // console.log(key,district_data[key]);
        let district_name = key
        let cases = parseInt(district_data[key].confirmed)
        let new_cases = parseInt(district_data[key].delta.confirmed)
        dataTable_data.push(
            {
                id: i,
                district: district_name,
                cases: cases,
                new_cases: new_cases
            }
        )
    }

    columns = [
        {
            name: '#',
            selector: 'id',
            sortable: false,
            style: {
                fontWeight: "500",
            },
            width: "50px",
            format: row => <span> > </span>,

        },
        {
            name: 'District',
            selector: 'district',
            sortable: true,
            left: true,
            style: {
                fontWeight: "500",
            },
            width: "200px"

        },
        {
            name: 'Total',
            selector: 'cases',
            sortable: true,
            left: true,
            style: {
                color: "black",
                fontWeight: "500",
            },
            format: row => <span>{row.cases} <small className="blinking">{row.new_cases > 0 ? "+" + row.new_cases : ""}</small></span>,
            // cell:row => <div><div style={{ fontWeight: "bold" }}>{row.total}</div> +{row.new_total}</div>,
        },



    ];

    // console.log(props.data)
    return (<div>
        {/* // {JSON.stringify(data)} */}
        <div className="table-responsive">
            <DataTable
                title={`District wise ${data.name}`}
                noHeader={true}
                // theme="dark"
                // title={false}
                responsive={true}
                striped={true}
                keyField="id"
                defaultSortField="cases"
                defaultSortAsc={false}
                dense={true}
                columns={columns}
                data={dataTable_data}
                // expandableRows={true}
                // expandableRowsComponent={<SubTable />}
            />
        </div>
    </div>)

}

export default SubTable