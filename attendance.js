const worker = [
    {
        name: "Babai",
        id: 1,
        rate: 700,
        designation: "Driver",
        attendance: [
            {
                date: "24", time: 1.5, adv: 300
            },
            {
                date: "25", time: 1.5, adv: 300
            },
            {
                date: "26", time: 1.5, adv: 300
            },
        ]

    },
    {
        name: "Vishwanath",
        id: 2,
        rate: 600,
        designation: "Driver",
        attendance: [
            {
                date: "24", time: 1.5, adv: 300
            },
            {
                date: "25", time: 1.5, adv: 300
            },
            {
                date: "26", time: 1.5, adv: 300
            },
        ]

    },
    {
        name: "Sandeep",
        id: 3,
        rate: 1000,
        designation: "Driver",
        attendance: [
            {
                date: "24", time: 1.5, adv: 300
            },
            {
                date: "25", time: 1.5, adv: 300
            },
            {
                date: "26", time: 1.5, adv: 300
            },
        ]

    },
]


// for (let i = 0; i < worker.length; i++) {
//     let attendance = worker[i].attendance;
//     console.log(`Name : ${worker[i].name} Rate : ${worker[i].rate}`);
//     let time = 0
//     let adv = 0
//     attendance.forEach((e) => {
//         time = time + e.time,
//             adv = adv + e.adv
//     })

//     console.log(`Time : ${time} and Advance : ${adv}`);
//     console.log(`Actual Pay : ${time * worker[i].rate}`);

//     const pay = time * worker[0].rate - adv;
//     console.log("pay", pay, "\n");

// }

const takeattendance = (id)=>{
    for (let i = 0; i < worker.length; i++) {
        
        if (worker[i].id === id) {
            worker[i].attendance.push({
                    date:"28",
                    time:1.5,
                    adv:233
            })
        }
        
    }
}

let id = 3

takeattendance(id)

console.log(worker[2].attendance  , worker[2].name);