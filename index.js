$(document).ready((function() {

    const ghostNames = ["Banshee", "Demon", "Jinn", "Mare", "Oni", "Phantom", "Poltergeist", "Revenant", "Shade", "Spirit", "Wraith", "Yurei"];
    const evidence = ["emf-5", "fingerprints", "freezing-temperatures", "ghost-orb", "ghost-writing", "spirit-box"];
    const evidenceLabels = {
        'emf-5': 'EMF Level 5',
        'fingerprints': 'Fingerprints',
        'freezing-temperatures': 'Freezing Temperatures',
        'ghost-orb': 'Ghost Orb',
        'ghost-writing': 'Ghost Writing',
        'spirit-box': 'Spirit Box',
    }
    let currentEvidence = ['', '', ''];
    const ghosts = [
        {
            "id": "banshee",
            "name": "Banshee",
            "evidence": ["emf-5", "fingerprints", "freezing-temperatures"],
            "strengths": "A Banshee will focus on one player at a time until it kills them or the player leaves the building.",
            "weaknesses": "Banshees fear the Crucifix, which boosts the Hunt-stopping range of one from 3 meters to 5 meters against it.",
            "description": "A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill."
        },
        {
            "id": "demon",
            "name": "Demon",
            "evidence": ["freezing-temperatures", "ghost-writing", "spirit-box"],
            "strengths": "Demons are the most aggressive ghosts and will begin Hunts more often.",
            "weaknesses": "Asking a Demon successful questions on the Ouija Board won't lower the user's sanity.",
            "description": "A Demon is one of the worst Ghosts you can encounter. It has been known to attack without a reason"
        },
        {
            "id": "jinn",
            "name": "Jinn",
            "evidence": ["emf-5", "ghost-orb", "spirit-box"],
            "strengths": "A Jinn will travel at a faster speed if its victim is far away.",
            "weaknesses": "Turning off the location's power source will prevent the Jinn from using its ability.",
            "description": "A Jinn is a territorial Ghost that will attack when threatened. It also has been known to travel at significant speed."
        },
        {
            "id": "mare",
            "name": "Mare",
            "evidence": ["freezing-temperatures", "ghost-orb", "spirit-box"],
            "strengths": "Increased chance to attack in the dark. As such, it will do what it can to achieve this, such as turning off lights and tripping the fuse box.",
            "weaknesses": "Turning the lights on will lower its chance to attack.",
            "description": "A Mare is the source of all nightmares, making it most powerful in the dark."
        },
        {
            "id": "oni",
            "name": "Oni",
            "evidence": ["emf-5", "fingerprints", "freezing-temperatures"],
            "strengths": "Oni are more active when people are nearby and have been seen moving objects at great speed.",
            "weaknesses": "Being more active will make the Oni easier to find and identify.",
            "description": "Onis are a cousin to the Demon and possess extreme strength. There have been rumors that they become more active around their prey."
        },
        {
            "id": "phantom",
            "name": "Phantom",
            "evidence": ["emf-5", "fingerprints", "freezing-temperatures"],
            "strengths": "Looking at a Phantom will considerably drop your Sanity. This refers to any visible manifestations of the Phantom, including during a Hunt.",
            "weaknesses": "Taking a photo of the Phantom will make it temporarily disappear. This, however, will not stop a Hunt.",
            "description": "A Phantom is a Ghost that can possess the living, most commonly summoned by a Ouija Board. It also induces fear into those around it."
        },
        {
            "id": "poltergeist",
            "name": "Poltergeist",
            "evidence": ["fingerprints", "ghost-orb", "spirit-box"],
            "strengths": "A Poltergeist is capable of influencing more objects at once than any other Ghosts, and is capable of shutting multiple doors at once.",
            "weaknesses": "A Poltergeist is almost ineffective in an empty room.",
            "description": "One of the most famous Ghosts, a Poltergeist, also known as a noisy ghost can manipulate objects around it to spread fear into it's victims."
        },
        {
            "id": "revenant",
            "name": "Revenant",
            "evidence": ["emf-5", "fingerprints", "ghost-writing"],
            "strengths": "A Revenant will travel at a significantly faster speed when hunting a victim. Additionally, the Revenant can freely switch whoever it is targeting during a Hunt.",
            "weaknesses": "Hiding from the Revenant will cause it to move very slowly.",
            "description": "A Revenant is a slow but violent Ghost that will attack indiscriminantly. It has been rumored to travel at a significantly high speed when hunting."
        },
        {
            "id": "shade",
            "name": "Shade",
            "evidence": ["emf-5", "ghost-orb", "ghost-writing"],
            "strengths": "As a shy ghost, a Shade will rarely perform actions in the presence of two or more people, making it harder to detect.",
            "weaknesses": "Conversely, a Shade will rarely start a Hunt when players are grouped together.",
            "description": "A Shade is known to be a Shy Ghost. There is evidence that a Shade will stop all paranormal activity if there are multiple people nearby."
        },
        {
            "id": "spirit",
            "name": "Spirit",
            "evidence": ["fingerprints", "ghost-writing", "spirit-box"],
            "strengths": "The spirit has no discernible strengths, however it is known to increase its hunting as your sanity drops.",
            "weaknesses": "Using Smudge Sticks on a Spirit will stop it attacking for 180 seconds instead of 90.",
            "description": "A Spirit is the most common Ghost you will come across however it is still very powerful and dangerous. They are usually discovered at one of their hunting grounds after an unexplained death."
        },
        {
            "id": "wraith",
            "name": "Wraith",
            "evidence": ["fingerprints", "freezing-temperatures", "spirit-box"],
            "strengths": "Wraiths almost never touch the ground, but this does not apply to the ghost model. Because of this, footprint sounds from a wraith will be rare to non-existent, and they can travel directly through walls doors without having to open them.",
            "weaknesses": "Wraiths have a toxic reaction to Salt. If a Wraith comes into contact with a pile of salt, Ghost Activity will significantly increase.",
            "description": "A Wraith is one of the most dangerous Ghosts you will find. It is also the only known ghost that has the ability of flight and has sometimes been known to travel through walls."
        },
        {
            "id": "yurei",
            "name": "Yurei",
            "evidence": ["freezing-temperatures", "ghost-orb", "ghost-writing"],
            "strengths": "Yurei have been known to have a stronger effect on people's Sanity during a manifestation.",
            "weaknesses": "Using Smudge Sticks on the Yurei will cause it to not wander around the location for ~90 seconds.",
            "description": "A Yurei is a Ghost that has returned to the physical world, usually for the purpose of revenge or hatred."
        }
    ];

    $('.evidence-select').change(updateGhosts);

    function updateGhosts(ev) {
        const currentIndex = parseInt($(ev.currentTarget).attr('data-target'));
        const selectedEvidence = $(ev.currentTarget).val();
        currentEvidence[currentIndex] = selectedEvidence;
        const filteredGhosts = ghosts.filter(function(value, index) {
            for(let i = 0; i < currentEvidence.length; i++) {
                if(!currentEvidence[i] || currentEvidence[i] == '') continue;
                if(value.evidence.indexOf(currentEvidence[i]) < 0) {
                    return false;
                }
            }
            return true;
        });

        printGhosts(filteredGhosts);
        remainingEvidence(filteredGhosts);
    }

    function printGhosts(filteredGhosts) {
        $('#ghosts').html('');
        for(let i = 0; i < filteredGhosts.length; i++) {
            var ghost = $('<div></div>');
            var title = $('<h2></h2>');

            title.html(filteredGhosts[i].name);
            ghost.append(title);

            var description = $('<p></p>');
            description.html(filteredGhosts[i].description);
            ghost.append(description);

            var strength = $('<p></p>');
            strength.html('<strong>Unique Strengths: </strong>' + filteredGhosts[i].strengths + '</p>');
            ghost.append(strength);

            var weakness = $('<p></p>');
            weakness.html('<strong>Weaknesses: </strong>' + filteredGhosts[i].weaknesses + '</p>');
            ghost.append(weakness);

            var evidenceContainer = $('<p><strong>Evidence: </strong></p>');

            var evidence = $('<span></span>');
            for(let j = 0; j < filteredGhosts[i].evidence.length; j++) {
                evidence.append(evidenceLabels[filteredGhosts[i].evidence[j]]);
                if(j < filteredGhosts[i].evidence.length) {
                    evidence.append(', ');
                }
            }
            evidenceContainer.append(evidence);        
            ghost.append(evidenceContainer);
            $('#ghosts').append(ghost);
        }
    }

    function remainingEvidence(filteredGhosts) {
        let remainingEvidence = [];
        for(let i = 0; i < filteredGhosts.length; i++) {
            for(let j = 0; j < filteredGhosts[i].evidence.length; j++) {
                if(!remainingEvidence.includes(filteredGhosts[i].evidence[j]) && !currentEvidence.includes(filteredGhosts[i].evidence[j])) {
                    remainingEvidence.push(filteredGhosts[i].evidence[j]);
                }
            }
        }
        $('#remainingEvidence').html('');
        remainingEvidence.sort();
        if(remainingEvidence.length > 0) {
            for(let i = 0; i < remainingEvidence.length; i++) {
                if(i < remainingEvidence.length) {
                    $('#remainingEvidence').append(evidenceLabels[remainingEvidence[i]] + ', ');
                } else {
                    $('#remainingEvidence').append(evidenceLabels[remainingEvidence[i]]);
                }
            }
        } else {
            $('#remainingEvidence').append('None');    
        }
    }

    function init() {
        $('.evidence-select').each(function(index) {
            const currentIndex = index;
            const selectedEvidence = $(this).val();
            currentEvidence[currentIndex] = selectedEvidence;
        });

        $('#clearEvidence').click(function() {
            currentEvidence = ['', '', ''];
            $('.evidence-select').val('');
            remainingEvidence(ghosts);
            printGhosts(ghosts);
        })

        const filteredGhosts = ghosts.filter(function(value, index) {
            for(let i = 0; i < currentEvidence.length; i++) {
                if(!currentEvidence[i] || currentEvidence[i] == '') continue;
                if(value.evidence.indexOf(currentEvidence[i]) < 0) {
                    return false;
                }
            }
            return true;
        });

        remainingEvidence(filteredGhosts);
        printGhosts(filteredGhosts);
    }

    init()
}));