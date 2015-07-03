//returns the right colour for each party

define(function () {
    
    Colors = function () { 

        this.partyColor = {

            "CON":  "#0575c9",
            "LAB":  "#ed1e0e",
            "SNP":  "#ebc31c",
            "LD":   "#fe8300",
            "UKIP": "#712f87", 
            "GRN":  "#78c31e", 
            "SPE":  "#999999",
            "DUP":  "#c0153d", 
            "SDLP": "#65a966",
            "SF":   "#00623f",
            "UUP":  "#6ab1e6",
            "IND":  "#999999",
            "PC":   "#4e9f2f"
          }

    }

    Colors.prototype = {

        forThisParty:function(party){

            return(this.partyColor[party])

        }
    }

  return Colors;

});