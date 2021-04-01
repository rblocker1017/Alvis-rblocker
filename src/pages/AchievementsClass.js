export default class Achievement {

    constructor(name){
        this.achievementName = name;
        this.completed = false;
        this.achievemenDescription = "No Description Provided";
    }



    set name(name){
        this.achievementName = name;
    }

    get name(){
        return this.achievementName;
    }




   set description(desc){
       this.achievemenDescription = desc;
   }

   get description(){
       return this.achievemenDescription;
   }

    set status(isCompleted){
        this.completed = isCompleted;
    }

    get status(){
        if (this.completed == true){
            return "Completed"
        }
        else {
            return "Incomplete"
        }
        
    }


}