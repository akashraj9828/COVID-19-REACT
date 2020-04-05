import React from "react"
import DataTable from 'react-data-table-component';
import SubTable from "./SubTable"


function Table(props){
    console.log(props)
        // console.log("loggggggg", data.state_wise);
        const data=props.data
        const total_data=props.data.total_values
        let all_keys = Object.keys(data.state_wise)
        let i = 1;
        let dataTable_data=[]
        for (let key in all_keys) {
            // console.log(key);
            key = all_keys[key]
            if (!data.state_wise[key].confirmed) {
                continue
            }
            let confirmed = parseInt(data.state_wise[key].confirmed)
            let deaths = parseInt(data.state_wise[key].deaths)
            let recovered = parseInt(data.state_wise[key].recovered)
            let active = parseInt(data.state_wise[key].active)

            let new_confirmed = data.state_wise[key].deltaconfirmed ? parseInt(data.state_wise[key].deltaconfirmed) : 0
            let new_deaths = data.state_wise[key].deltadeaths ? parseInt(data.state_wise[key].deltadeaths) : 0
            let new_recovered = data.state_wise[key].deltarecovered ? parseInt(data.state_wise[key].deltarecovered) : 0
            let new_active = data.state_wise[key].deltaactive ? parseInt(data.state_wise[key].deltaactive) : 0
            let district_wise = data.state_wise[key].district


         
            dataTable_data.push(
                {
                    id: i,
                    state: key,
                    total: confirmed,
                    active: active,
                    deaths: deaths,
                    recovered: recovered,
                    new_total: new_confirmed,
                    new_active: new_active,
                    new_deaths: new_deaths,
                    new_recovered: new_recovered,
                    district_wise: district_wise,
                }
            )

            // data_list.push(
            //     <ListItem key={key} rank={i} data={data.state_wise[key]} />
            // )
            // card_list.push(
            //     <CardItem key={i} rank={i} data={data.state_wise[key]} />
            // )
            i++
        }

        let columns = [
            {
                name: '#',
                selector: 'id',
                sortable: true,
                style: {
                    fontWeight: "500",
                },
                width: "50px"
            },
            {
                name: 'State',
                selector: 'state',
                sortable: true,
                left: true,
                style: {
                    fontWeight: "500",
                },

            },
            {
                name: 'Total',
                selector: 'total',
                sortable: true,
                left: true,
                style: {
                    color: "black",
                    fontWeight: "500",
                },
                format: row => <span>{row.total} <small className="blinking">{row.new_total > 0 ? "+" + row.new_total : ""}</small></span>,
                // cell:row => <div><div style={{ fontWeight: "bold" }}>{row.total}</div> +{row.new_total}</div>,
                width: "100px"

            },
            {
                name: 'Active',
                selector: 'active',
                sortable: true,
                left: true,
                style: {
                    color: "orange",
                    fontWeight: "500",
                },
                format: row => <span>{row.active} <small className="blinking">{row.new_active > 0 ? "+" + row.new_active : ""}</small></span>,
                width: "100px"


            },
            {
                name: 'Deaths',
                selector: 'deaths',
                sortable: true,
                left: true,
                style: {
                    color: "red",
                    fontWeight: "500",
                },
                format: row => <span>{row.deaths} <small className="blinking">{row.new_deaths > 0 ? "+" + row.new_deaths : ""}</small></span>,
                width: "100px"


            },
            {
                name: 'Recovered',
                selector: 'recovered',
                sortable: true,
                left: true,
                style: {
                    color: "green",
                    fontWeight: "500",
                },
                format: row => <span>{row.recovered} <small className="blinking">{row.new_recovered > 0 ? "+" + row.new_recovered : ""}</small></span>,
                width: "100px"


            },

        ];

        return (
            <div>
                    <h6 class='small text-muted m-0 text-center w-100'> Last updated: {total_data.lastupdatedtime}</h6>

            <DataTable
            // title="State wise Data"
            noHeader={true}
            // theme="dark"
            title={false}
            responsive={true}
            striped={true}
            keyField="id"
            dense={true}
            columns={columns}
            data={dataTable_data}
            expandableRows={true}
            expandableRowsComponent={<SubTable/>}
        />
            </div>


        )
       
    }


export default Table