!(() => {
    let projects = [{
        name: "webpack-starter",
        type: "github",
        url: "https://github.com/wbkd/webpack-starter",
        lang: {
            zh: "使用最新的Webpack构建你的前端项目！",
            en: "A lightweight foundation for your next webpack based frontend project."
        },
        tags: ['webpack', 'javascript']
    }]

    function buildList() {
        let html = projects.reduce((html, item) => {
            return html + `<div class="project">
            <div class="head">
                <span class="name">${item.name}</span>
                <span class="type tag blue pointer">${item.type || '默认'}</span>
                <span class="edit pointer" title="Edit" data-projectname="${item.name}">🖊</span>
            </div>
            <div class="lang">
                <div>
                    <span class="tag">zh-cn</span>
                    <span>${item.lang.zh}</span>
                </div>
                <div>
                    <span class="tag">en-us</span>
                    <span>${item.lang.en}</span>
                </div>
            </div>
            <div class="tags">
                ${item.tags.map(tag => `<span class="tag red">${tag}</span>`).join('')}
            </div>
        </div>`
        }, '')
        document.querySelector('.container').innerHTML = html
    }

    function editProject(name) {
        let project = projects.find(item => item.name == name)
        let editEl = document.querySelector('.edit-modal')
        let nameEl = document.getElementById('projectname')
        let typeEl = document.getElementById('projecttype')
        let gitUrlEl = document.getElementById('githubaddress')
        let zhEl = document.getElementById('zh-lang')
        let enEl = document.getElementById('en-lang')
        let tagEl = document.getElementById('taglist')
        nameEl.value = project ? project.name : ''
        typeEl.value = project ? project.type : ''
        gitUrlEl.value = project ? project.url : ''
        zhEl.value = project ? project.lang.zh : ''
        enEl.value = project ? project.lang.en : ''
        tagEl.value = project ? project.tags.join('  ') : ''
        editEl.classList.remove('hide')
    }

    document.querySelector('.container').addEventListener('click', e => {
        let el = e.target
        let name = el.getAttribute('data-projectname')
        if (name) {
            editProject(name)
        }
    })
    document.querySelector('.edit-modal .action .cancel').addEventListener('click', () => {
        document.querySelector('.edit-modal').classList.add('hide')
    })
    document.querySelector('.edit-modal .action .save').addEventListener('click', () => {
        document.querySelector('.edit-modal').classList.add('hide')
        let nameEl = document.getElementById('projectname')
        let typeEl = document.getElementById('projecttype')
        let gitUrlEl = document.getElementById('githubaddress')
        let zhEl = document.getElementById('zh-lang')
        let enEl = document.getElementById('en-lang')
        let tagEl = document.getElementById('taglist')
        let project = {
            name: nameEl.value,
            type: typeEl.value,
            url: gitUrlEl.value,
            lang: {
                zh: zhEl.value,
                en: enEl.value,
            },
            tags: tagEl.value.split(/[ ]{1,}/g).filter(Boolean)
        }
        if (!projects.some((item, i) => {
            if (item.name == nameEl.value) {
                projects[i] = project
                return true;
            }
        })) {
            projects.push(project)
        }
        buildList()
    })

    document.querySelector('.download').addEventListener('click', () => {
        let a = document.createElement('a')
        a.href = URL.createObjectURL(new Blob([JSON.stringify(projects, null, 4)], { type: "text/json" }))
        a.download = 'projects.json'
        a.click()
    })

    document.querySelector('.addnew').addEventListener('click', () => editProject())

    buildList()
})()