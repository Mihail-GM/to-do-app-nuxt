import merge from 'lodash.merge'
import { v4 as uuidv4 } from 'uuid'
import flushPromises from 'flush-promises'
import ProjectsCreateDialog from '~/components/Projects/ProjectsCreateDialog.vue'

import {
  addVuelidate,
  addVuetify,
  addVuex,
  bootstrapVueContext,
  compositeConfiguration,
  customWrapper
} from '~/tests/utils'

jest.mock('uuid')

describe('ProjectsCreateDialog', () => {
  let vueContext = null

  beforeEach(() => {
    vueContext = bootstrapVueContext(
      compositeConfiguration(addVuelidate, addVuex, addVuetify)
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const storeMock = {
    state: {},
    dispatch: jest.fn(),
    commit: jest.fn()
  }

  const createWrapper = (overrides) => {
    const defaultMountingOptions = {
      mocks: {
        $store: storeMock
      },
      propsData: {
        showDialogProp: true
      }
    }

    return customWrapper(ProjectsCreateDialog, vueContext, merge(defaultMountingOptions, overrides)
    )
  }

  const findInputNameField = wrapper => wrapper.find('[data-q-name-input]')
  const findCloseButton = wrapper => wrapper.find('[data-q-close-button]')
  const findCreateButton = wrapper => wrapper.find('[data-q-submit-button]')

  describe('Input name text field', () => {
    test('Shows correct error message when name is not valid', async () => {
      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('')
      await findInputNameField(wrapper).trigger('blur')
      await flushPromises()

      expect(wrapper.findAll('.v-messages__message').at(0).text()).toBe('Must contain at least 1 character')
    })

    test('Shows correct error message when name is more then 32 chars', async () => {
      expect.assertions(1)
      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
      await findInputNameField(wrapper).trigger('blur')
      await flushPromises()

      expect(wrapper.findAll('.v-messages__message').at(0).text()).toBe('Can contain maximum of 32 characters')
    })

    test('Do not show error message when name is valid', async () => {
      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('Valid project name')
      await findInputNameField(wrapper).trigger('blur')
      await flushPromises()

      expect(wrapper.findAll('.v-messages__message').length).toBe(0)
    })
  })

  describe('Close button', () => {
    test('Reset data and correct emit when close dialog', async () => {
      expect.assertions(3)
      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('test')
      await findCloseButton(wrapper).trigger('click')
      await flushPromises()

      expect(wrapper.vm.project.name).toEqual(null)
      expect(wrapper.emitted('update:showDialogProp').length).toBe(1)
      expect(wrapper.emitted('update:showDialogProp').at(0)).toEqual([false])
    })
  })

  describe('Create project button', () => {
    test('Sets button to disabled when name is not valid', async () => {
      expect.assertions(1)
      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('')
      await findInputNameField(wrapper).trigger('blur')
      await flushPromises()

      expect(findCreateButton(wrapper).attributes('disabled')).toBe('disabled')
    })

    test('Sets button to be clickable when name is valid', async () => {
      expect.assertions(1)
      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('Project name')
      await findInputNameField(wrapper).trigger('blur')
      await flushPromises()

      expect(findCreateButton(wrapper).attributes('disabled')).toBe(undefined)
    })

    test('Calls correct emit when create is clicked with valid data', async () => {
      expect.assertions(2)
      uuidv4.mockImplementationOnce(() => '9c55f43d-49b7-49c2-bdf3-31706b2fb373')

      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('Project name')
      await findCreateButton(wrapper).trigger('click')
      await flushPromises()

      expect(wrapper.emitted('createProject').length).toBe(1)
      expect(wrapper.emitted('createProject').at(0)).toStrictEqual([
        {
          id: '9c55f43d-49b7-49c2-bdf3-31706b2fb373',
          name: 'Project name',
          tasks: []
        }
      ])
    })
  })

  describe('Snapshot tests', () => {
    test('Matches snapshot when component is mounted', () => {
      const wrapper = createWrapper()

      expect(wrapper.html()).toMatchSnapshot()
    })

    test('Matches snapshot when project name is incorrect', async () => {
      expect.assertions(1)
      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('')
      await findInputNameField(wrapper).trigger('blur')

      expect(wrapper.html()).toMatchSnapshot()
    })

    test('Matches snapshot when project name is correct', async () => {
      expect.assertions(1)
      const wrapper = createWrapper()
      await findInputNameField(wrapper).setValue('Correct project name')
      await findInputNameField(wrapper).trigger('blur')

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
