// import { Button, MenuItem } from "@material-ui/core";
// import Backdrop from "@material-ui/core/Backdrop";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import MenuList from "@material-ui/core/MenuList";
// import Modal from "@material-ui/core/Modal";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import React, { useState } from "react";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     height: 600,
//     width: "100%",
//     fixed: true,
//   },
// }));

// export default class Achievement extends React.Component {
//   constructor(props) {
//     super(props);
//     this.name = "No Name Given";
//     this.completed = false;
//     this.achievemenDescription = "No Description Provided";
//   }

//   set name(name) {
//     this.achievementName = name;
//   }

//   get name() {
//     return this.achievementName;
//   }

//   set description(desc) {
//     this.achievemenDescription = desc;
//   }

//   get description() {
//     return this.achievemenDescription;
//   }

//   set status(isCompleted) {
//     this.completed = isCompleted;
//   }

//   get status() {
//     if (this.completed == true) {
//       return "Completed";
//     } else {
//       return "Incomplete";
//     }
//   }

//   render() {
//     const classes = useStyles();
//     const [sort, setSort] = useState("");
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => {
//       setOpen(true);
//     };

//     const handleClose = () => {
//       setOpen(false);
//     };

//     const handleChange = (event) => {
//       setSort(event.target.value);
//     };

//     return (
//       <div>
//         <buttons type='button' className={classes.button} onClick={handleOpen}>
//           <MenuList>
//             <MenuItem align='center'>View</MenuItem>
//           </MenuList>
//         </buttons>
//         <Modal
//           aria-labelledby='View Detailed Achievement'
//           aria-describedby='Detailed Descritpion of Ahcievement'
//           className={classes.modal}
//           open={open}
//           onClose={handleClose}
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             classes: {
//               root: classes.root,
//             },
//           }}
//           PaperProps={{
//             classes: {
//               root: classes.paper,
//             },
//           }}
//         >
//           <div className={classes.paperOverlay}>
//             <Card className={classes.root}>
//               <CardContent>
//                 <Typography
//                   className={classes.title}
//                   color='textSecondary'
//                   gutterBottom
//                 >
//                   Sample Icon
//                 </Typography>
//                 <Typography variant='h5' component='h2'>
//                   Name: {this.name}
//                 </Typography>
//                 <Typography className={classes.pos} color='textSecondary'>
//                   Description: {this.description}
//                 </Typography>
//                 <Typography variant='body2' component='p'>
//                   Date: Completed on X/X/XXXX
//                   <br />
//                   {"Category: A Sample Category for the achievement"}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size='small'>Learn More</Button>
//               </CardActions>
//             </Card>
//           </div>
//           {/*achievementClassTest.render()*/}
//         </Modal>
//       </div>
//     );
//   }
// }
