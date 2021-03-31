import { endent, property } from '@dword-design/functions'
import atomizerModule from '@dword-design/nuxt-atomizer'
import axios from 'axios'
import { outputFile } from 'fs-extra'
import { Builder, Nuxt } from 'nuxt'
import withLocalTmpDir from 'with-local-tmp-dir'

import plugin from '.'

export default {
  valid: () =>
    withLocalTmpDir(async () => {
      await outputFile(
        'pages/index.js',
        endent`
      export default {
        render: () => <div class="Objf(cv)">Hello world</div>,
      }
    `
      )

      const nuxt = new Nuxt({
        atomizer: {
          plugins: [plugin],
        },
        dev: false,
        modules: [atomizerModule],
      })
      await new Builder(nuxt).build()
      try {
        await nuxt.server.listen()
        expect(
          axios.get('http://localhost:3000/acss.css')
            |> await
            |> property('data')
        ).toEqual('.Objf\\(cv\\){-o-object-fit:cover;object-fit:cover}')
      } finally {
        nuxt.close()
      }
    }),
}
