
downloadfile <- function(fileUrl,path_to_data){
      
      if(!file.exists(path_to_data)){
            
            download.file(fileUrl, destfile = path_to_data, method="curl")
            dateDownloaded <- date()  
            dateDownloaded
            
      } else {
            print("File already on system: ")
      }
      
      if(file.exists(path_to_data)){
            
            return(TRUE)
            
      }else{
            
            return(FALSE)
            
      }
}

getHTML <-function(page_name,page_url,cname){
      
      path_to_file<- paste0("./data/",page_name,".html",sep = "")
         
      if(downloadfile(page_url, path_to_file)){
            
            data <-extractDataFromHTML(page_name,path_to_file,cname)
            return(data)
            
      } else {
            
            return("problem downloading page")
      }
}


extractDataFromHTML <- function(page_name,path_to_file,cname){
      
      #Parse the HTML to var page
      
      library(XML)    
      library(RCurl)

      page <- htmlTreeParse(path_to_file, useInternalNodes = TRUE)
      
      # Construct data.frame for this.constituency
      
      result <- xpathSApply(page, "//*/span[@class='results-turnout__label']", xmlValue)
      majority <- xpathSApply(page, "//*/span[@class='results-turnout__value']", xmlValue)
      percentages <- xpathSApply(page, "//*/span[@class='results-turnout__value results-turnout__value--right']", xmlValue)
      
      turnout <-percentages[2]
      
      #results-turnout__percentage/results-turnout__value results-turnout__value--right
      
      constituency_result <- data.frame(page_name, cname, shorten(result), removeText(majority), removeText(turnout))
      names(constituency_result) <- c("PCON14CD", "constituency name", "result","majority", "turnout")

      
      parties<- xpathSApply(page,"//*/div[@class='party__name--short']", xmlValue)
      votes<- xpathSApply(page,"//*/li[@class='party__result--votes essential']", xmlValue)
      votesshare<- xpathSApply(page,"//*/li[@class='party__result--votesshare essential']", xmlValue)
      change<- xpathSApply(page,"//*/li[@class='party__result--votesnet essential']", xmlValue)
      
      partiesData <- list(parties, votes, votesshare, change)
      
      partiesdf<-cleanPartiesData(partiesData)

      constituency_result <- cbind(constituency_result, partiesdf)

      return(constituency_result)
     
}

removeBrackets <- function(val){
      
      val <- gsub(pattern ="[\\( | \\)]", replacement = "",  x = val)
      #print(val)
}

removeText <- function(val){
      
      val <- gsub(pattern ="[a-z | A-Z | \\, |\\% ]", replacement = "",  x = val)
      val <- as.numeric(as.character(val))
}

shorten <- function(val){
      
      val <- gsub(pattern ="majority:", replacement = "",  x = val)
      val <- gsub(pattern ="[[:space:]]*$", replacement = "",  x = val) #triallingWhiteSpace

}


unduplicate<-function(v){
      
      if(anyDuplicated(v)){
            
            v1<-duplicated(v) 
            
            v2<-which(v1) #(3, 4)
            
            for (i in 1:length(v2)) {
                  
                  dupe<-v2[i]               
                  v[dupe]<-paste0(v[dupe],i)
                  
            }       
      }      
      return(v)      
}


cleanPartiesData<- function(data){
      
      df <- as.data.frame(data)
      names(df)<- c("party", "votes", "share", "change") 
      
      #Remove unwanted text, etc
      df[,"party"]<-sapply(df[,"party"],removeBrackets)
      df[,c("votes", "share", "change")]<-sapply(df[,c("votes", "share", "change")],removeText)
      
      library(reshape2)  
      
      df2 <- melt(df)
      
      labels <- do.call(paste0, df2[c(1, 2)]) # concat cols "LAB" + "vote", etc
      df2 <- cbind(labels,df2)
      df2[,"party"]<-NULL
      df2[,"variable"]<-NULL # remove cols (must be one line that does this?)
      
      dfcolnames<-as.vector(df2[,1])
      
      #Check names are unique i.e. more than one IND candidate
      dfcolnames<-unduplicate(dfcolnames)
      
      dfcolvals<-as.vector(df2[,2])
      
      df3 <- data.frame(dfcolvals)
      rownames(df3)<-dfcolnames      
      df3 <- t(df3)  # df3 make wide rather than long
      rownames(df3)<-NULL
      
      return(df3)
      
}

getData <-function(id,cname){
      
      page_name <- id
      page_url <- paste0("http://www.bbc.com/news/politics/constituencies/",id)
      this.constituencyResult <- getHTML(page_name,page_url,cname)
      
      return(this.constituencyResult)
      
}

getConstituencyIDs <- function(){
      
      constituencies <- read.csv("./data/PCON_2014_UK_NC.csv", colClasses ="character")
       
      #constituencies <- read.csv("./data/PCON_test.csv", colClasses ="character") #FOR TESTING
      
      #SOURCE:https://geoportal.statistics.gov.uk/geoportal/catalog/main/home.page
      
      return(constituencies)
}

init <- function(){
      
      electionsData <- data.frame(constituency=character(0), labvote= numeric(0))
      
      constituencies <- getConstituencyIDs()
      
      library(plyr)
      
      resultsData <- getData(constituencies[1,"PCON14CD"], constituencies[1,"PCON14NM"])   
      
      for (i in 2:nrow(constituencies)) {
            
            df<-getData(constituencies[i,"PCON14CD"], constituencies[i,"PCON14NM"])
            
            resultsData<-rbind.fill(resultsData, df)
            
      }
            
      View(resultsData)
      write.csv(resultsData, file = "./results2015.csv")
      
}