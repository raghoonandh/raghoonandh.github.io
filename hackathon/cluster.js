class Cluster extends Chart {
  constructor(options) {
    super(options)
    var self = this

    // Takes the following properties
    // category: determines the cluster, default: category
    // radius: size of the circle, default: radius
    // rscale: scale of the particles, default, range([2, 40])
    // color: color scale
    // space: space between the particles, default: 1
    // cool: transition time, default: 4000
    self.prop('category').category(d => d.category)
        .prop('radius').radius(d => d.radius)
        .prop('rscale').rscale(d3.scaleLinear().range([2, 30]))
        .prop('color').color(d3.scaleSequential(d3.interpolateRainbow))
        .prop('space').space(1)
        .prop('cool').cool(4000)
        .prop('label').label(d => d.radius)
        .prop('clusters')

    self.on('predraw.layout', self.layout)                  // Define the layout
        .join()                                             // Create the Update Pattern
        .on('draw.clusters', self.render)                    // Call the Render method
  }

  // Define the layout
  layout(node) {
    var self = this
    // Get the Size of the Node
    var size = self.size(node),
        data = self.data(),
        category = self.category(),
        radius = self.radius(),
        rscale = self.rscale(),
        clusters = self.clusters()

    // Distinct Category types
    var categories = [... new Set(data.map(category))],
        clusters = new Array(categories.length),
        cz = clusters.length

    // Calculate the domain based on radius values
    rscale.domain(d3.extent(data, radius))

    // Add the x, y properties
    data.forEach(function(d) {
      var c = category(d),
          i = categories.indexOf(c), // [0,1,2,3,4]
          r = rscale(radius(d))

      Object.assign(d, {
        cluster: i,
        radius: r,
        x: Math.cos(i / cz * 2 * Math.PI) * 200 + size.width / 2 + Math.random(),
        y: Math.sin(i / cz * 2 * Math.PI) * 200 + size.height / 2 + Math.random()
      })

      if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
    })

    // Update the data
    self.data(data)
    // Update the clusters
    self.clusters(clusters)
  }

  render(node) {
    var self = this
    var size = self.size(node)

    var data = this.data(),
        space = self.space(),
        cool = self.cool(),
        color = self.color(),
        label = this.label(),
        clusters = self.clusters()

    color.domain(d3.range(clusters.length))

    // Define the Modular forces
    var force = d3.forceSimulation()
      .force('center', d3.forceCenter(size.width/2, size.height/2))                      // Keep aligned accross the center
      .force('attract', attract().target([size.width/2, size.height/2]).strength(0.02)) // Pull towards the center
      .force('cluster', cluster().strength(0.4))                                        // Cluster Force
      .force('collide', d3.forceCollide(d => d.radius + space).strength(0))           // Collision force
      .on('tick', layoutTick)
      .nodes(data)

    self.enter().append('circle').classed('particle', true)
    self.enter().append('text').classed('label', true)

    self.update().select('circle.particle')
        .style("fill", function(d) { return color(d.cluster/clusters.length) })
        .on('mouseover', cluster_tip.show)
        .on('mouseout', cluster_tip.hide)

    self.update().select('text.label')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .text(d => label(d))

    var transitionTime = cool;
    var t = d3.timer(function (elapsed) {
      var dt = elapsed / transitionTime
      force
        .force('collide')
        .strength(Math.pow(dt, 2) * 0.7)
      if (dt >= 1.0) t.stop()
    })

    // RUN FOR EVERY TICK
    function layoutTick(e) {
      self.update().select('circle')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', d => d.radius)

      self.update().select('text')
          .attr('x', d => d.x)
          .attr('y', d => d.y)
    }

    // CLUSTERING FORCE
    function cluster () {
      var nodes,
          strength = 0.1

      var clusters = self.clusters()

      function force (alpha) {
        // scale + curve alpha value
        alpha *= strength * alpha
        nodes.forEach(function(d) {
          var cluster = clusters[d.cluster]
          if (cluster === d) return

          let x = d.x - cluster.x,
            y = d.y - cluster.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + cluster.radius;

          if (l != r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l
            d.y -= y *= l
            cluster.x += x
            cluster.y += y
          }
        })
      }

      force.initialize = function (_) {
        nodes = _
      }

      force.strength = _ => {
        strength = _ == null ? strength : _
        return force
      }

      return force
    }

    // ATTRACTION FORCE
    function attract (target) {
      let nodes,
        targets,
        strength = 0.1;

      function force (alpha) {
        let node, target
        for (let i=0; i<nodes.length; i++) {
          node = nodes[i]
          target = targets[i]
          node.vx += (target[0] - node.x) * strength * alpha
          node.vy += (target[1] - node.y) * strength * alpha
        }
      }

      force.initialize = _ => {
        nodes = _
        targets = new Array(nodes.length)
        for (let i=0; i<nodes.length; i++) targets[i] = target(nodes[i], i, nodes)
      }

      force.strength = _ => {
        strength = _ == null ? strength : _
        return force
      };

      force.target = _ => {
        if (_ == null) _ = target
        target = (typeof _ === 'function') ? _ : () => _
        return force
      }

      if (!target) force.target([ 0, 0 ])
      return force
    }
  }
}
