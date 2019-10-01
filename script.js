Vue.component('project-category', {
  props: ['projects', 'tag'],
  template: `
    <section class="category">
      <h2 class="category-title">Our <span class="category-tag">{{ tag }}</span> projects</h2>
      <div class="projects-container" v-bind:id="tag">
        <a v-bind:href="repoUrl(p)" class="project" v-for="p in projects">
          <div>
            <h3 class="title">
              <span class="emoji">{{ p.emoji }}</span>
              {{ p.name }}
            </h3>
            <div>
              <span class="tag" v-for="tag in p.tags">{{ tag }}</span>
            </div>
            <p>{{ p.description }}</p>
          </div>

          <div>
            <a class="github-button" v-bind:href="repoUrl(p)" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star this on GitHub">Star</a>
          </div>
        </a>
      </div>
    </section>
  `,
  methods: {
    repoUrl: function (project) {
      return "https://github.com/EmbarkStudios/" + project.name
    },
  }
})

fetch('./data.json').then(response => {
  return response.json();
}).then(data => {
  console.log(data)

  new Vue({  
    el: '#app',
    data: data,

    computed: {
      featuredProjects: function() {
        return this.projects.filter(p => p.featured);
      },
      alphabetisedProjects: function() {
        return this.projects.sort((a, b) => a.name.localeCompare(b.name));
      }
    },

    methods: {
      repoUrl: function (project) {
        return "https://github.com/EmbarkStudios/" + project.name
      },
      // Return a filtered array of all projects with a tag
      projectsWithTag: function (tag) {
        return this.projects.filter(function (p) {
          return p.tags.includes(tag)
        })
      }
    }  
  })

}).catch(err => {
  console.log('Failed to get project data'); 
});