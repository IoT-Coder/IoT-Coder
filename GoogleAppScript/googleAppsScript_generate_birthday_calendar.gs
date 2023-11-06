function write_birthday_calendar() {

  //Name of your personal additional Google calendar
  calname = "birthday_new"

  var Today = new Date();
  var StartDeleteDate = new Date();
  var EndDeleteDate = new Date();
  var StartCopyDate = new Date();
  var EndCopyDate = new Date();


  StartDeleteDate.setDate(Today.getDate()-400); 
  EndDeleteDate.setDate(Today.getDate()+400);
  StartCopyDate.setDate(Today.getDate()-360);
  EndCopyDate.setDate(Today.getDate()+360);

  var akt_tag = Today.getDate();
  var akt_mon = Today.getMonth() + 1;
  var akt_year = Today.getFullYear();// use getFullYear() method
 // console.log("heute jahr = "+ year );

  // Gets the public calendar named "birthday_new".
  var calendarDestination = CalendarApp.getCalendarsByName(calname);
  Logger.log('Found %s matching calendars.', calendarDestination.length);

 
  var eventToDelete = calendarDestination[0].getEvents(StartDeleteDate, EndDeleteDate);
    for (var i = 0; i < eventToDelete.length; i++) {  
      eventToDelete[i].deleteEvent();
      Utilities.sleep(100); /// add a timer
      }  
  

  try {
    /**
     * List the n connections/contacts of users ( i have around 400 contacts ... so setting n to 500 to be sure to read every person)
     * @see https://developers.google.com/people/api/rest/v1/people.connections/list
     */
    const connections = People.People.Connections.list('people/me', {
      pageSize: 500,
      personFields: 'names,emailAddresses,birthdays'
      // use other query parameter here if needed.
    });
    connections.connections.forEach((person) => {
      // if contacts/connections is available, print the name of person.
      if (person.names && person.names.length === 0) {
        console.log('No display name found for connection.');
        return;
      }
      // if contact is available and has a entry for birthday.
      if (person.birthdays) {
      
            //calculating the age of the person
            //console.log("test = "+ person.names[0].displayName);
            var alter = akt_year - parseInt(person.birthdays[0].date.year) ;
            //console.log("Alter = "+ alter);
            console.log("Kontakt = "+ person.names[0].displayName +" : Alter = "+alter);
            
            
            // generating an event for the birthday
            var ev_tag=person.birthdays[0].date.day;
            var ev_mon=person.birthdays[0].date.month;
            //var ev_jahr=person.birthdays[0].date.year;

            var zeit1 = new Date(akt_year,ev_mon-1,ev_tag,0,0,0);
            new Date( )
            var zeit2 = new Date(akt_year,ev_mon-1,ev_tag+1,0,0,0); ;
            
            var newTitle = person.names[0].displayName +" has birthday and gets "+alter +" years old" ;

            console.log("test : "+newTitle +"    start:"+zeit1 +"    stop:"+zeit2);

           var newEvent = calendarDestination[0].createEvent( newTitle, zeit1 , zeit2);


            Utilities.sleep(100); // add a timer

      }
 
      //console.log("names = "+ person.names);
    });
  } catch (err) {
    // TODO (developer) - Handle exception from People API
    console.log('Failed with error %s', err.message);
  }
}
 
