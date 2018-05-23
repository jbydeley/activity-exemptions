<template>
  <div :id="localId" class="activity-exemptions">
    <exempt-button-group
      :show-exempt="!showNoUsers" />

    <user-search />

    <div class="exemptions-count-container">
      <span 
        v-if="!showNoUsers"
        class="exemption-count">
        {{ $t('lblExemptionCount', { exemptionCount }) }}
      </span>
    </div>

    <table 
      v-if="hasUsers"
      :summary="$t('ariaTableSummary')">
      <thead>
        <tr>
          <th>
            <input
              :aria-label="$t('ariaSelectUnselectAll')"
              :checked="allSelected"
              type="checkbox"
              class="d2l-checkbox"
              @change="selectAll">
          </th>
          <!--
          To support both User Information Privacy and RTL, we need to conditionally
          render one of four options. If the API changes in the future to support
          preferred names, this could be reduced or eliminated entirely.
          -->
          <th>
            <span v-if="canSeeFirstName">{{ $t('lblFirstName') }}</span>
            <span v-if="canSeeLastName">{{ $t('lblLastName') }}</span>
            <span v-if="!canSeeFirstName && !canSeeLastName">{{ $t('lblUser') }}</span>
          </th>
          <th v-if="canSeeOrgIdColumn">{{ $t('lblOrgDefinedId') }}</th>
          <th>{{ $t('lblExemptStatus') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in allUsers" :key="user.Identifier">
          <td>
            <input :aria-label="ariaSelectText(user)" type="checkbox" class="d2l-checkbox" :checked="user.isSelected" @change="toggleSelection(user)">
          </td>
          <td>{{user.fullName}}</td>
          <td v-if="canSeeOrgIdColumn">{{user.OrgDefinedId}}</td>
          <td>
            <span v-if="isUserExempt(user)">{{ $t('lblExempt') }}</span>
            <span v-else class="d2l-offscreen">{{ $t('lblNotExempt') }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <exempt-button-group
      class="bottom-button-group"
      :show-load-more="hasMoreItems"
      :show-exempt="hasUsers"
      :is-loading="isLoading" />

    <empty-message 
      v-if="!isLoading"
      :query-term="queryTerm"
      :show-empty-search="showEmptySearch"
      :show-no-users="showNoUsers" />

    <div v-if="isLoading" class="loading d2l-partial-render-shimbg2"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EmptyMessage from 'src/components/EmptyMessage.vue'
import ExemptButtonGroup from 'src/components/ExemptButtonGroup.vue'
import UserSearch from 'src/components/UserSearch.vue'

export default {
  name: 'activity-exemptions',
  components: {
    EmptyMessage,
    UserSearch,
    ExemptButtonGroup
  },

  created() {
    const locale = document.documentElement.lang
      || document.documentElement.getAttribute('data-lang-default')
      || 'en'

    this.$i18n.locale = locale.toLowerCase()
  },

  computed: {
    ...mapGetters([
      'allUsers',
      'isUserExempt',
      'exemptionCount',
      'allSelected',
      'hasMoreItems',
      'isLoading',
      'canSeeOrgIdColumn',
      'canSeeFirstName',
      'canSeeLastName',
      'localId',
      'hasUsers',
      'showNoUsers',
      'queryTerm',
      'showEmptySearch',
      'showNoUsers'
    ]),

    ariaSelectText() {
      return (user) => {
        let userIdentifier = user.fullName

        if( !this.canSeeFirstName && !this.canSeeLastName && this.canSeeOrgIdColumn ) {
          userIdentifier += " " + user.OrgDefinedId
        }

        return this.isUserExempt(user) 
        ? this.$t('ariaSelectExemptUser', {fullName: userIdentifier})
        : this.$t('ariaSelectNotExemptUser', {fullName: userIdentifier})
      }
    }
  },

  methods: {
    ...mapActions([
      'selectAll',
      'toggleSelection'
    ])
  }
}
</script>

<style src="./css/style.css" scoped></style>
