import React from 'react';

type gridTitlesType = GridTitle[]
type GridTitle = {
    id:number
    title:string
}
const gridTitle:gridTitlesType = [
    {id:1, title:'title'},
    {id:2, title:'published by'},
    {id:3, title:'rating'},
    {id:4, title:'comments'},
    {id:5, title:'date'},
];

export const NewsTable = () => {
    return (
        <table>
            <caption>
                recent news
            </caption>
            <tbody>
            <tr>
                {
                    gridTitle.map(title => <th key={title.id}>{title.title}</th>)
                }
            </tr>
            <tr>
                <td>newssasasasasdasdhasdasgjkhdgasjhgdasjhgdasdjhasgasgasgshahjfgasaghgsghahasja</td>
                <td>John Wick</td>
                <td>15 stars</td>
                <td>324</td>
                <td>25.01.2023</td>
            </tr>
            </tbody>
        </table>
    )
}



/* return <span><ul className={'newsWrapper'}>{
     gridTitle.map(title => <li>{title}</li>)
 }</ul>
 <ul className={'newsLine'}>
     <li>asasdasdajadshdasadshasdasdasdjasdhjgsahsdjahsa</li>
     <li>John Wick</li>
     <li>10/10s</li>
     <li>144</li>
     <li>26.04.2023</li>
 </ul></span>
*/


