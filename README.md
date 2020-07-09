# RealTimeConferenceScheduler
Codexio Dev Camp Project

Меню:
1. логин 
2. сигнин
3. алл конференце
4. мои конференции
5. нова конференция -> connected to already added hall and speaker in the database. (dropdown menu)
6. нов говорител 
7. нова зала

1. Advane na konferenciq
	- proverka za ime (dali vece ima takava konferenciq) - gotovo
	- proverka dali end time e sled start time - gotovo
2. Advane na spiker - gotovo
	- proverka za ime (dali veche ima takav speaker) - gotovo
3. Advane na zala 
	- proverka za ime (dali veche ima takava zala) - gotovo
4. Advane na nova sesiq za konferenciq
	-proverka da li Owner-a koito se opitva da dobavi nova sesiq e owner na tazi konferenciq - gotovo
	- proverka dali end time e sled start time - gotovo

	-proverka da li speakera-a e zaet po tova vreme 
	-proverka da li zalata e svobodna po tova vreme
5. Joinvane na sessiq ot attendee
	-proverka da li e lognat user-a
	-proverka da li tazi sesiq ne syvpada s druga sessiq koqto user attendva
	-proverka da li ima seats available


// exports.postAddConference = (req, res, next) => {

//     const name = req.body.name
//     const description = req.body.description
//     const startTime = req.body.startTime;
//     const endTime = req.body.endTime;
//     const address = req.body.address;
//     const userId = req.user._id;
//     const newConference = new Conference({
//         name,
//         description,
//         startTime,
//         endTime,
//         address,
//         userId
//     })
//     Conference.findOne({name: name}).then(conf => {
//         if (!conf && (newConference.startTime < newConference.endTime)) {
//             return newConference.save().then(() => {
//                 return req.user.addToConfOwner(newConference)
//             }).then(() => {
//                 res.redirect("/allconferences");
//                 console.log("Conference added successful")
//             }).catch(err => console.log(err))
//         } else {
//             console.log("Conference already exist!")
//             res.redirect("/add-conference");
//         }
//     })

// }