readData<-function(file_to_read){
      
      data <- read.csv(file_to_read) 
      return(data)
      
}

plot2<-function(fullresults, pay){
      
      cols<-c("PCON14CD","constituency","turnout","majority","result")
      
      selectedData <- fullresults[,cols]

      df <- merge(selectedData, pay, by.x = "PCON14CD")
      
      View(df)
      ## Now write a nice JSON file for D3
      
      library(jsonlite)
      
      
 
}

init<-function(){
      
      fullresults<-readData("./results2015.csv")
      annualpay<-readData("./annualpay.csv")
     
      plot2(fullresults,annualpay)

      
}