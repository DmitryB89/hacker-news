import React from 'react';

const gridTitle = ['title', 'published by', 'rating', 'comments', 'date'];

export const NewsTable = () => {
    return (
        <table>
            <caption>
                recent news
            </caption>
            <tr>
                {
                    gridTitle.map(title => <th>{title}</th>)
                }
            </tr>
            <tr>
                <td>newssasasasasdasdhasdasgjkhdgasjhgdasjhgdasdjhasgasgasgshahjfgasaghgsghahasja</td>
                <td>John Wick</td>
                <td>15 stars</td>
                <td>324</td>
                <td>25.01.2023</td>
            </tr>

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


