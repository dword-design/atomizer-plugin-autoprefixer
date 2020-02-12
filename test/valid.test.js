import withLocalTmpDir from 'with-local-tmp-dir'
import { endent, property } from '@dword-design/functions'
import { outputFile } from 'fs-extra'
import { Nuxt, Builder } from 'nuxt'
import atomizerModule from '@dword-design/nuxt-atomizer'
import axios from 'axios'
import plugin from '@dword-design/atomizer-plugin-autoprefixer'

export default () => withLocalTmpDir(__dirname, async () => {
  await outputFile('pages/index.js', endent`
    export default {
      render: () => <div class="Objf(cv)">Hello world</div>,
    }
  `)
  const nuxt = new Nuxt({
    modules: [atomizerModule],
    atomizer: {
      plugins: [plugin],
    },
    dev: false,
  })
  await new Builder(nuxt).build()
  try {
    await nuxt.server.listen()
    expect(axios.get('http://localhost:3000/acss.css') |> await |> property('data'))
      .toEqual('.Objf\\(cv\\){-o-object-fit:cover;object-fit:cover}')
  } finally {
    nuxt.close()
  }
})
