// import { Typography } from "@mui/material"
// const Description = () => {

//     return (
//         <>
//          <Typography variant="h6" mb={3}>
//           Specification:
//         </Typography>
//         <Typography variant="subtitle2">Brand: Beats</Typography>
//         <Typography variant="subtitle2">Model: S450</Typography>
//         <Typography variant="subtitle2">Wireless Bluetooth Headset</Typography>
//         <Typography variant="subtitle2">
//           FM Frequency Response: 87.5 – 108 MHz
//         </Typography>
//         <Typography variant="subtitle2">
//           Feature: FM Radio, Card Supported (Micro SD / TF)
//         </Typography>
//         <Typography variant="subtitle2">Made In China</Typography></>
//     )
// }

// export default Description


import { Typography } from "@mui/material"
const Description = ({description}) => {

    return (
        <>
         <Typography variant="h6" mb={3}>
          Specification:
        </Typography> 
        <Typography>
         {description}
        </Typography>
        </>
    )
}

export default Description