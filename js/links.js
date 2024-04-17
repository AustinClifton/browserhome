const linksContainer = document.getElementById('quickLinksContainer');

function createLinkBlocks() {
    fetch('./data/links.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(link => {
            //anchor element for the entire link block
            const linkBlock = document.createElement('a');
            linkBlock.classList.add('linkBlock');
            linkBlock.target = "_blank";
            linkBlock.href = link.url;

            //img element for the link icon
            const icon = document.createElement('img');
            icon.classList.add('linkIcon');
            icon.src = link.icon;

            //span element for the link name (ex. 'Gmail - ajc4409')
            const linkName = document.createElement('span');
            linkName.classList.add('linkName');
            linkName.textContent = `${link.name}\n`;

            //span element for the link url (ex. 'https://mycourses.rit.edu/d2l/home')
            const linkUrl = document.createElement('span');
            linkUrl.classList.add('linkUrl'); 
            const truncatedUrl = link.url.substring(0, 28) + '...';
            linkUrl.textContent = truncatedUrl;

            linkName.appendChild(linkUrl);
            linkBlock.appendChild(icon);
            linkBlock.appendChild(linkName);

            //determine the section div based on the link's section
            let sectionDivClass = '';
            switch (link.section) {
                case 'general':
                    sectionDivClass = 'generalLinks';
                    break;
                case 'code':
                    sectionDivClass = 'codeLinks';
                    break;
                case 'school':
                    sectionDivClass = 'schoolLinks';
                    break;
                case 'work':
                    sectionDivClass = 'workLinks';
                    break;
                case 'email':
                    sectionDivClass = 'emailLinks';
                    break;
                case 'helpful':
                    sectionDivClass = 'helpfulLinks';
                    break;
                case 'games':
                    sectionDivClass = 'gamesLinks';
                    break;
                case 'crypto':
                    sectionDivClass = 'cryptoLinks';
                    break;
                case 'doc':
                    sectionDivClass = 'docLinks';
                    break;
                case 'project':
                    sectionDivClass = 'projectLinks';
                    break;
                case 'streaming':
                    sectionDivClass = 'streamingLinks';
                    break;
            }

            //append the link block to the appropriate topic div
            const sectionDiv = document.querySelector(`.${sectionDivClass}`);
            sectionDiv.appendChild(linkBlock);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.onload = createLinkBlocks;
